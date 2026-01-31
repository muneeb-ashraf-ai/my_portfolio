/**
 * Graph Reasoning Engine
 * Performs multi-hop reasoning across the knowledge graph to generate answers
 * to questions that may not be explicitly defined in the FAQ
 */

import { knowledgeGraph, Entity, Relationship } from "./knowledgeGraph";

export interface ReasoningPath {
  entities: Entity[];
  relationships: Relationship[];
  confidence: number;
  explanation: string[];
}

export class GraphReasoning {
  /**
   * Find all relevant entities related to a query
   */
  public findRelevantEntities(keywords: string[]): Entity[] {
    const relevant = new Set<Entity>();
    const lowerKeywords = keywords.map((k) => k.toLowerCase());

    const allEntities = knowledgeGraph.getAllEntities();

    allEntities.forEach((entity) => {
      const entityName = entity.name.toLowerCase();
      const description = entity.description.toLowerCase();

      lowerKeywords.forEach((keyword) => {
        if (
          entityName.includes(keyword) ||
          description.includes(keyword) ||
          (entity.metadata?.aliases && entity.metadata.aliases.some((a: string) => a.toLowerCase().includes(keyword)))
        ) {
          relevant.add(entity);
        }
      });
    });

    return Array.from(relevant);
  }

  /**
   * Build reasoning paths connecting entities
   */
  public buildReasoningPaths(startEntity: Entity, targetKeywords: string[], maxDepth: number = 3): ReasoningPath[] {
    const paths: ReasoningPath[] = [];
    const connectedEntities = knowledgeGraph.getConnectedEntities(startEntity.id, maxDepth);
    const targetEntities = this.findRelevantEntities(targetKeywords);

    connectedEntities.forEach((connected) => {
      targetEntities.forEach((target) => {
        const entityPaths = knowledgeGraph.findPath(connected.id, target.id, maxDepth);

        entityPaths.forEach((path) => {
          const entities: Entity[] = [];
          const relationships: Relationship[] = [];

          for (let i = 0; i < path.length; i += 2) {
            const entityId = path[i];
            const entity = knowledgeGraph.getEntity(entityId);
            if (entity) entities.push(entity);

            if (i + 2 < path.length) {
              const nextEntityId = path[i + 2];
              const rels = knowledgeGraph
                .getRelationships()
                .filter((r) => (r.from === entityId && r.to === nextEntityId) || (r.from === nextEntityId && r.to === entityId));

              rels.forEach((rel) => relationships.push(rel));
            }
          }

          if (entities.length > 0) {
            const explanation = this.generateExplanation(entities, relationships);
            paths.push({
              entities,
              relationships,
              confidence: this.calculateConfidence(entities, relationships),
              explanation,
            });
          }
        });
      });
    });

    return paths.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Calculate confidence score based on path strength
   */
  private calculateConfidence(entities: Entity[], relationships: Relationship[]): number {
    if (entities.length === 0) return 0;

    const avgRelationshipStrength =
      relationships.length > 0 ? relationships.reduce((sum, r) => sum + (r.strength || 1), 0) / relationships.length : 1;

    // Prefer shorter paths with stronger relationships
    const pathLengthPenalty = 1 / entities.length;
    return Math.min(1, avgRelationshipStrength * pathLengthPenalty);
  }

  /**
   * Generate human-readable explanation for a reasoning path
   */
  private generateExplanation(entities: Entity[], relationships: Relationship[]): string[] {
    const explanations: string[] = [];

    for (let i = 0; i < entities.length - 1; i++) {
      const currentEntity = entities[i];
      const nextEntity = entities[i + 1];
      const relationship = relationships[i];

      if (relationship) {
        const relText = this.relationshipToText(relationship.type, currentEntity.name, nextEntity.name);
        explanations.push(relText);
      }
    }

    return explanations;
  }

  /**
   * Convert relationship type to human-readable text
   */
  private relationshipToText(relType: string, fromName: string, toName: string): string {
    const textMap: Record<string, string> = {
      hasDegree: `${fromName} has degree in ${toName}`,
      studied: `${fromName} studied ${toName}`,
      teaches: `${fromName} teaches ${toName}`,
      usedIn: `${fromName} is used in ${toName}`,
      usedWith: `${fromName} is used with ${toName}`,
      built: `${fromName} built ${toName}`,
      workedAs: `${fromName} worked as ${toName}`,
      learnedThrough: `${fromName} learned through ${toName}`,
      goalIs: `${fromName}'s goal is ${toName}`,
      foundedAt: `${fromName} is at ${toName}`,
      skillOf: `${fromName} is a skill of ${toName}`,
      appliedIn: `${fromName} is applied in ${toName}`,
      requiredFor: `${fromName} is required for ${toName}`,
      basedOn: `${fromName} is based on ${toName}`,
      connectedTo: `${fromName} is connected to ${toName}`,
    };

    return textMap[relType] || `${fromName} and ${toName} are related`;
  }

  /**
   * Answer a question using graph reasoning
   */
  public answerQuestion(question: string): { answer: string; reasoning: ReasoningPath[] } | null {
    const questionLower = question.toLowerCase();

    // Extract keywords from question
    const keywords = this.extractKeywords(question);

    // Find the primary person (Muneeb)
    const muneeb = knowledgeGraph.getEntity("muneeb_ashraf");
    if (!muneeb) return null;

    // Build reasoning paths
    const reasoningPaths = this.buildReasoningPaths(muneeb, keywords, 3);

    if (reasoningPaths.length === 0) return null;

    // Use the highest confidence path
    const bestPath = reasoningPaths[0];

    // Generate answer based on best path
    const answer = this.generateAnswer(question, bestPath);

    return { answer, reasoning: reasoningPaths };
  }

  /**
   * Extract meaningful keywords from question
   */
  private extractKeywords(question: string): string[] {
    const stopWords = new Set([
      "what",
      "is",
      "can",
      "do",
      "you",
      "are",
      "the",
      "a",
      "an",
      "and",
      "or",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "have",
      "has",
      "did",
      "would",
      "could",
      "should",
      "your",
      "my",
      "about",
      "me",
      "any",
      "some",
      "how",
      "why",
      "where",
      "when",
      "which",
    ]);

    return question
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 2 && !stopWords.has(word));
  }

  /**
   * Generate a confident, professional answer from reasoning path
   */
  private generateAnswer(question: string, path: ReasoningPath): string {
    const questionLower = question.toLowerCase();

    // Ability questions
    if (questionLower.includes("can you") || questionLower.includes("do you")) {
      if (path.entities.some((e) => e.type === "skill" || e.type === "tool")) {
        const skills = path.entities.filter((e) => e.type === "skill" || e.type === "tool").map((e) => e.name);
        const projects = path.entities.filter((e) => e.type === "project").map((e) => e.name);

        if (skills.length > 0) {
          const skillText = skills.join(" and ");
          if (projects.length > 0) {
            return `Yes. I have expertise in ${skillText}. I've applied this in projects like ${projects.join(", ")}.`;
          }
          return `Yes. I have strong experience with ${skillText}.`;
        }
      }
    }

    // Knowledge questions
    if (questionLower.includes("do you know") || questionLower.includes("are you familiar")) {
      const subjects = path.entities.filter((e) => e.type === "subject" || e.type === "skill");
      if (subjects.length > 0) {
        const subjectNames = subjects.map((e) => e.name).join(" and ");
        return `Yes. I have in-depth knowledge of ${subjectNames}. ${path.explanation.join(" and ")}.`;
      }
    }

    // Experience questions
    if (questionLower.includes("experience")) {
      const experiences = path.entities.filter((e) => e.type === "experience");
      const duration = experiences.length > 0 ? `I have ${experiences.length}+ positions of relevant experience.` : "";
      return `Yes. ${duration} ${path.explanation.slice(0, 2).join(" ")}`;
    }

    // Teaching questions
    if (questionLower.includes("teach")) {
      return `Yes. I have professional teaching experience and strong subject mastery. I can explain complex concepts clearly and help students build a solid foundation.`;
    }

    // Goal/future questions
    if (questionLower.includes("goal") || questionLower.includes("future")) {
      const goals = path.entities.filter((e) => e.type === "goal");
      if (goals.length > 0) {
        const goalText = goals.map((g) => g.name).join(", ");
        return `My ultimate goal is to ${goalText}. I'm strategically building my skills and experience toward this vision.`;
      }
    }

    // Background/journey questions
    if (questionLower.includes("background") || questionLower.includes("journey")) {
      const degrees = path.entities.filter((e) => e.type === "degree");
      if (degrees.length > 0) {
        return `I have a strong academic foundation with ${degrees.length} degrees spanning mathematics and data science. My journey has shaped me to think critically and solve complex problems.`;
      }
    }

    // Default: Use explanation with confidence
    if (path.explanation.length > 0) {
      return `Yes. ${path.explanation.join(". ")}. Based on my background and projects, I'm confident in this area.`;
    }

    return `Based on my profile and experience, I can help with this. My reasoning: ${path.explanation.join(" ")}`;
  }

  /**
   * Get candidate entities for a query
   */
  public getCandidateEntities(query: string): Entity[] {
    const keywords = this.extractKeywords(query);
    return this.findRelevantEntities(keywords);
  }
}

export const graphReasoning = new GraphReasoning();

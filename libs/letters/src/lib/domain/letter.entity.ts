export enum LetterStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export class Letter {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public title: string,
    public status: LetterStatus,
    public readonly createdAt: Date,
    public sender?: string | null,
    public analysisResult?: string | null,
  ) {
  }

  completeAnalysis(result: string): void {
    if (!result) {
      throw new Error('Analysis result cannot be empty');
    }
    this.analysisResult = result;
    this.status = LetterStatus.COMPLETED;
  }
}

import { Client, Databases, Account, Storage, AppwriteException, Avatars } from "appwrite";
import { ENV } from "@/lib/appwrite";
import { Observability } from "./observability-service";

export abstract class BaseApiService {
  protected client: Client;
  protected databases: Databases;
  protected account: Account;
  protected storage: Storage;
  protected avatars: Avatars;

  constructor() {
    this.client = new Client()
      .setEndpoint(ENV.APPWRITE_ENDPOINT)
      .setProject(ENV.APPWRITE_PROJECT_ID);
    
    this.databases = new Databases(this.client);
    this.account = new Account(this.client);
    this.storage = new Storage(this.client);
    this.avatars = new Avatars(this.client);
  }

  /**
   * Centralized error handling with production logging
   */
  protected handleError(error: unknown, context?: string): never {
    if (error instanceof AppwriteException) {
      Observability.trackError(error, `Appwrite:${context || 'General'}`);
      throw error;
    }
    
    const unexpectedError = error instanceof Error ? error : new Error("Unexpected System Failure");
    Observability.trackError(unexpectedError, `Internal:${context || 'General'}`);
    throw unexpectedError;
  }

  /**
   * Resilient request wrapper with retry logic
   */
  protected async withRetry<T>(
    operation: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (retries > 0) {
        console.warn(`[Resilience] Retrying operation... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.withRetry(operation, retries - 1, delay * 2);
      }
      throw error;
    }
  }

  /**
   * Sanitization utility to prevent XSS/Injection
   */
  protected sanitizeInput(input: string): string {
    return input.replace(/[<>]/g, ""); // Basic cleanup
  }
}

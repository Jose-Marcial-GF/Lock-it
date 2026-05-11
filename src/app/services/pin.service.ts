import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root' })
export class PinService {

  readonly isMobile = Capacitor.isNativePlatform();
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;

  private async ensureDb(): Promise<SQLiteDBConnection | null> {
    if (!this.isMobile) return null;
    if (this.db) return this.db;

    this.db = await this.sqlite.createConnection('lockitdb', false, 'no-encryption', 1, false);
    await this.db.open();
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS pins (
        userId    TEXT NOT NULL,
        passwordId TEXT NOT NULL,
        PRIMARY KEY (userId, passwordId)
      );
    `);
    return this.db;
  }

  async getPinnedIds(userId: string): Promise<string[]> {
    const db = await this.ensureDb();
    if (!db) return [];
    const res = await db.query('SELECT passwordId FROM pins WHERE userId = ?', [userId]);
    return (res.values ?? []).map((r: any) => r.passwordId as string);
  }

  async isPinned(userId: string, passwordId: string): Promise<boolean> {
    const db = await this.ensureDb();
    if (!db) return false;
    const res = await db.query(
      'SELECT 1 FROM pins WHERE userId = ? AND passwordId = ? LIMIT 1',
      [userId, passwordId]
    );
    return (res.values?.length ?? 0) > 0;
  }

  async togglePin(userId: string, passwordId: string): Promise<boolean> {
    const db = await this.ensureDb();
    if (!db) return false;
    const pinned = await this.isPinned(userId, passwordId);
    if (pinned) {
      await db.run('DELETE FROM pins WHERE userId = ? AND passwordId = ?', [userId, passwordId]);
      return false;
    } else {
      await db.run('INSERT OR IGNORE INTO pins (userId, passwordId) VALUES (?, ?)', [userId, passwordId]);
      return true;
    }
  }
}

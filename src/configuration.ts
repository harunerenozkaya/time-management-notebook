import * as fs from 'fs';
import * as path from 'path';
import { BookDivision } from './enum/bookDivision';

export { BookDivision };

export interface ConfigurationConfig {
    language: string;
    year: number;
    owner: string;
    contact: string;
    bookDivision: BookDivision;
    pageMargin: string | number;
    frontCoverInitialSpacing: number;
    titleTextSize: number;
    contentTextSize: number;
    firstDayOfWeek: number;
    todoTableStatusCellType: string;
    dailyPageTodoTableCellCount: number;
    dailyPageTodoTableCellHeight: number;
    nonDailyPageTodoTableCellCount: number;
    nonDailyPageTodoTableCellHeight: number;
    timeTrackingTableCellHeight: number;
    timeTrackingTableStartHour: number;
    timeTrackingTableEndHour: number;
}

export class Configuration {
    private config: ConfigurationConfig;

    constructor(config: ConfigurationConfig) {
        this.config = config;
    }

    public static loadFromConfigFile(configPath?: string): Configuration {
        const defaultConfigPath = path.join(process.cwd(), 'config.json');
        const filePath = configPath || defaultConfigPath;

        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const config: ConfigurationConfig = JSON.parse(fileContent);
            return new Configuration(config);
        } catch (error) {
            console.warn(`⚠️  Could not load config file from ${filePath}.`);
            throw new Error(`Failed to load configuration: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    public get language(): string { return this.config.language; }
    public get year(): number { return this.config.year; }
    public get owner(): string { return this.config.owner; }
    public get contact(): string { return this.config.contact; }
    public get bookDivision(): BookDivision { return this.config.bookDivision; }
    public get pageMargin(): string | number { return this.config.pageMargin; }
    public get frontCoverInitialSpacing(): number { return this.config.frontCoverInitialSpacing; }
    public get titleTextSize(): number { return this.config.titleTextSize; }
    public get contentTextSize(): number { return this.config.contentTextSize; }
    public get firstDayOfWeek(): number { return this.config.firstDayOfWeek; }
    public get todoTableStatusCellType(): string { return this.config.todoTableStatusCellType; }
    public get dailyPageTodoTableCellCount(): number { return this.config.dailyPageTodoTableCellCount; }
    public get dailyPageTodoTableCellHeight(): number { return this.config.dailyPageTodoTableCellHeight; }
    public get nonDailyPageTodoTableCellCount(): number { return this.config.nonDailyPageTodoTableCellCount; }
    public get nonDailyPageTodoTableCellHeight(): number { return this.config.nonDailyPageTodoTableCellHeight; }
    public get timeTrackingTableCellHeight(): number { return this.config.timeTrackingTableCellHeight; }
    public get timeTrackingTableStartHour(): number { return this.config.timeTrackingTableStartHour; }
    public get timeTrackingTableEndHour(): number { return this.config.timeTrackingTableEndHour; }
}


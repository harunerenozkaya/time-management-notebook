// Translation structure types
export type Language = 'en' | 'tr';

export interface TranslationContent {
  FRONT_COVER: {
    TITLE: string;
  };
  BOOK_DIVISION: {
    HALF_1: string;
    HALF_2: string;
    QUARTER_1: string;
    QUARTER_2: string;
    QUARTER_3: string;
    QUARTER_4: string;
  };
  GUIDE_PAGE: {
    TITLE: string;
    CONTENT: string;
  };
  YEARLY_TARGET_PAGE: {
    TITLE: string;
  };
  MONTHLY_TARGET_PAGE: {
    TITLE: string;
  };
  WEEKLY_TARGET_PAGE: {
    WEEK: string;
    TITLE: string;
  };
  WEEKLY_ROUTINE_PAGE: {
    TITLE: string;
  };
  DAILY_TARGET_PAGE: {
    TITLE: string;
    TIME_TRACKING_TITLE: string;
  };
  MONTHS: string[];
  DAYS: string[];
  TODO_TABLE: {
    TASK: string;
    IMPORTANCE: string;
    URGENCY: string;
    DIFFICULTY: string;
    STATUS: string;
  };

  TIME_TRACKING_TABLE: {
    TIME: string;
  };
}



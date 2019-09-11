import BaseItem from './BaseItem';

export default interface Module extends BaseItem {
  readonly courseId: string;
  readonly sortOrder: number;
  readonly title: string;
  readonly description?: string;
  readonly isPublished?: boolean;
}


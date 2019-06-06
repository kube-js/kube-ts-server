import BaseItem from './BaseItem';

export default interface Section extends BaseItem {
  readonly courseId: string;
  readonly sortOrder: number;
  readonly title: string;
  readonly description?: string;
  readonly isPublished?: boolean;
}


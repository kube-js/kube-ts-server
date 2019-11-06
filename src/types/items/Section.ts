import BaseItem from './BaseItem';

export default interface Module extends BaseItem {
  readonly courseId: string;
  readonly order: number;
  readonly title: string;
  readonly isPublished?: boolean;
}

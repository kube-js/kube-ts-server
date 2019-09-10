import BaseItem from './BaseItem';

export default interface Category extends BaseItem {
  readonly title: string;
  readonly slug: string;
}

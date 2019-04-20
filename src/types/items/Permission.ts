import BaseItem from './BaseItem';

export default interface Permission extends BaseItem {
  readonly name: string;
  readonly method: string;
  readonly url: string;
}

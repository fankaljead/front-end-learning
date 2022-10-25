class Queue<TElementType> {
  private _list: TElementType[];

  constructor(initial: TElementType[]) {
    this._list = initial;
  }

  enqueue<TType extends TElementType>(ele: TType): TElementType[] {
    this._list.push(ele);
    return this._list;
  }

  enqueueWithUnknownType<TType>(ele: TType): (TElementType | TType)[] {
    return [...this._list, ele];
  }

  dequeue(): TElementType | undefined {
    return this._list.shift();
  }
}


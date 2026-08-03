/** Generic object pool for traffic / particles. */
export class ObjectPool<T> {
  private free: T[] = []
  private readonly factory: () => T
  private readonly reset: (item: T) => void
  private readonly max: number

  constructor(factory: () => T, reset: (item: T) => void, initial = 8, max = 64) {
    this.factory = factory
    this.reset = reset
    this.max = max
    for (let i = 0; i < initial; i++) this.free.push(factory())
  }

  acquire(): T {
    if (this.free.length > 0) return this.free.pop()!
    return this.factory()
  }

  release(item: T): void {
    this.reset(item)
    if (this.free.length < this.max) this.free.push(item)
  }

  get available(): number {
    return this.free.length
  }
}

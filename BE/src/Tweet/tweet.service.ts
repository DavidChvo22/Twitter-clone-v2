import { Injectable } from '@nestjs/common';
import { Item } from '../Interfaces/item.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TweetService {
  private readonly items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  create(itemData: { content: string }): Item {
    const newItem: Item = {
      id: uuidv4(),
      content: itemData.content,
    };
    this.items.unshift(newItem);
    console.log('New tweet created:', newItem);
    return newItem;
  }

  delete(id: string): boolean {
    const initialLength = this.items.length;
    const newItems = this.items.filter((item) => item.id !== id);
    const wasDeleted = newItems.length < initialLength;

    if (!wasDeleted) {
      return false;
    }
    this.items.splice(0, initialLength, ...newItems);
    return true;
  }
}

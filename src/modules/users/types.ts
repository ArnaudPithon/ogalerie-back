import type { Situation } from '@/types/auth.js';

export type Person = {
  firstName: string;
  lastName: string;
  nickname: string;
  birthday: string;
  town: string;
  country: string;
  biography: string;
  avatar: string;
  situation: Situation;
}

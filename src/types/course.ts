export interface Course {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  short_description: string;
  description: string;
  level: string;
  category: string;
  lessons_count: number;
  duration: string;
  rating: number;
  students_count: number;
  xp_reward: number;
  theme_color: string;
  is_premium: boolean;
}
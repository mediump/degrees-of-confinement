import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface GameImage {
  url: string;
  type: 'dorm' | 'prison';
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './game.html',
  styleUrls: ['../app.css', './game.css'],
})
export class Game {
  private allDorms: string[] = [
    'https://www.american.edu/ocl/housing/images/DSC00037.jpg',
    'https://miro.medium.com/v2/resize:fit:1400/1*L4wLfL2NIpyVHd1kfRjF-w.jpeg',
    'https://rma.edu/custom_grid/student-life-boarding-day-dorm-life-us-dorms/',
    'https://i.redd.it/international-students-first-time-in-an-american-dorm-how-v0-9p4ikwjm0fm71.jpg?width=4608&format=pjpg&auto=webp&s=29fc005c1b3bfe0b5e0aa71c8e8fea7640495b82',
    'https://compote.slate.com/images/900cc109-4686-4e82-a7d4-9d453f73f97f.jpeg?crop=1560%2C1040%2Cx0%2Cy0&width=1200',
    'https://www.shutterstock.com/image-photo/mobile-al-usa-march-29th-600nw-2308740121.jpg',
    'https://www.thenation.com/wp-content/uploads/2026/04/YaleDorm.jpg',
    'https://eastsidepanther.org/wp-content/uploads/2021/03/unnamed-1-e1614920280283.jpg',
    'https://www.american.edu/ocl/housing/images/D18_105_015.jpg',
    'https://www.american.edu/ocl/housing/images/hrl_hughes_triple_01.jpg',
  ];

  private allPrisons: string[] = [
    'https://www.brennancenter.org/sites/default/files/styles/1400x800/public/2021-11/21_ForeignPrisons.jpg?itok=4YAK6GVx',
    'https://www.brennancenter.org/sites/default/files/2021-11/2011-07-27T120000Z_839079278_GM1E77S0FAY01_RTRMADP_3_NORWAY.JPG',
    'https://inews.co.uk/wp-content/uploads/2024/06/SEI_207755605.jpg',
    'https://ca-times.brightspotcdn.com/dims4/default/2e3b787/2147483647/strip/true/crop/8398x5599+0+0/resize/2000x1333!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F26%2F63%2F0e695f49442fb39d9aa3527e6811%2F1352005-fg-halden-prison-norway16-jp.jpg',
    'https://www.theplanjournal.com/sites/default/files/vessella-fig10.jpg',
    'https://world-architects.com/images/Projects/83/41/46/4d2ed4656ba940048956e7538779e744/4d2ed4656ba940048956e7538779e744.6e7b65d0.jpg',
    'https://thehorizonsun.com/features/2020/12/18/the-swedish-prison-system/',
    'https://swedenherald.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2F56609f62-2229-4897-bceb-a8c9b268d568%2F56609f62-2229-4897-bceb-a8c9b268d568.jpg&w=1200&q=75',
    'https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_618/MTc2MjQ4NTQ1NTg4ODgwODA5/most-luxurious-prisons-in-the-world-that-let-you-wish-you-were-incarcerated.webp',
    'https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_700/MTc2MjQ4NTQ1NTg5MzM5NTYx/most-luxurious-prisons-in-the-world-that-let-you-wish-you-were-incarcerated.webp',
  ];

  gameImages: GameImage[] = [];
  currentIndex = 0;
  score = 0;
  gameState: 'playing' | 'correct' | 'incorrect' | 'complete' = 'playing';
  lastGuessCorrect = false;

  constructor() {
    this.initializeGame();
  }

  private initializeGame(): void {
    const shuffledDorms = this.shuffleArray([...this.allDorms]).slice(0, 5);
    const shuffledPrisons = this.shuffleArray([...this.allPrisons]).slice(0, 5);

    const gameImages: GameImage[] = [
      ...shuffledDorms.map((url) => ({ url, type: 'dorm' as const })),
      ...shuffledPrisons.map((url) => ({ url, type: 'prison' as const })),
    ];

    this.gameImages = this.shuffleArray(gameImages);
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  makeGuess(guess: 'dorm' | 'prison'): void {
    const currentImage = this.gameImages[this.currentIndex];
    this.lastGuessCorrect = currentImage.type === guess;

    if (this.lastGuessCorrect) {
      this.score++;
      this.gameState = 'correct';
    } else {
      this.gameState = 'incorrect';
    }
  }

  nextImage(): void {
    this.currentIndex++;
    if (this.currentIndex >= this.gameImages.length) {
      this.gameState = 'complete';
    } else {
      this.gameState = 'playing';
    }
  }

  get currentImage(): GameImage {
    return this.gameImages[this.currentIndex];
  }

  get questionNumber(): number {
    return this.currentIndex + 1;
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ImageData {
  url: string;
  location: string;
}

interface GameImage {
  url: string;
  type: 'dorm' | 'prison';
  location: string;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './game.html',
  styleUrls: ['../app.css', './game.css'],
})
export class Game {
  private allDorms: ImageData[] = [
    {
      url: 'https://www.american.edu/ocl/housing/images/DSC00037.jpg',
      location: 'American University - Washington, DC, USA',
    },
    {
      url: 'https://carolinau.edu/sites/default/files/inline-images/Stevens%20W%20dorm%20-03.jpg',
      location: 'Carolina University - Winston-Salem, NC, USA',
    },
    {
      url: 'https://thescarlet.org/wp-content/uploads/2023/10/Safeimagekit-resized-img-1200x675.png',
      location: 'Clark University - Worcester, MA, USA',
    },
    {
      url: 'https://www.shutterstock.com/image-photo/mobile-al-usa-march-29th-600nw-2308740191.jpg',
      location: 'Spring Hill College - Mobile, AL, USA',
    },
    {
      url: 'https://www.bucknell.edu/sites/default/files/styles/3_2_s_aspect_switcher/public/libris/C00001GOQFVeT0YE/G0000xGr1JWPRvo0/19ResidenceHalls010.jpg',
      location: 'Bucknell University - Lewisburg, PA, USA',
    },
    {
      url: 'https://substackcdn.com/image/fetch/$s_!AQRV!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff1ebb8ec-2915-42fb-b0b6-d9f3a6cc13b8_1456x1092.webp',
      location: 'Bradley University - Peoria, IL, USA',
    },
    {
      url: 'https://www.thenation.com/wp-content/uploads/2026/04/YaleDorm.jpg',
      location: 'Yale University - New Haven, CT, USA',
    },
    {
      url: 'https://eastsidepanther.org/wp-content/uploads/2021/03/unnamed-1-e1614920280283.jpg',
      location: 'Eastside College Preparatory School - East Palo Alto, CA, USA',
    },
    {
      url: 'https://www.american.edu/ocl/housing/images/D18_105_015.jpg',
      location: 'American University - Washington, DC, USA',
    },
    {
      url: 'https://www.american.edu/ocl/housing/images/hrl_hughes_triple_01.jpg',
      location: 'American University - Washington, DC, USA',
    },
  ];

  private allPrisons: ImageData[] = [
    {
      url: 'https://www.brennancenter.org/sites/default/files/styles/1400x800/public/2021-11/21_ForeignPrisons.jpg?itok=4YAK6GVx',
      location: 'Halden Prison - Halden, Norway',
    },
    {
      url: 'https://www.brennancenter.org/sites/default/files/2021-11/2011-07-27T120000Z_839079278_GM1E77S0FAY01_RTRMADP_3_NORWAY.JPG',
      location: 'Halden Prison - Halden, Norway',
    },
    {
      url: 'https://inews.co.uk/wp-content/uploads/2024/06/SEI_207755605.jpg',
      location: 'Ringerike Prison - Ringerike, Norway',
    },
    {
      url: 'https://ca-times.brightspotcdn.com/dims4/default/2e3b787/2147483647/strip/true/crop/8398x5599+0+0/resize/2000x1333!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F26%2F63%2F0e695f49442fb39d9aa3527e6811%2F1352005-fg-halden-prison-norway16-jp.jpg',
      location: 'Halden Prison - Halden, Norway',
    },
    {
      url: 'https://www.theplanjournal.com/sites/default/files/vessella-fig10.jpg',
      location: 'Vordernberg Detention Centre - Vordernberg, Austria',
    },
    {
      url: 'https://world-architects.com/images/Projects/83/41/46/4d2ed4656ba940048956e7538779e744/4d2ed4656ba940048956e7538779e744.6e7b65d0.jpg',
      location: 'Leoben Centre of Justice - Leoben, Austria',
    },
    {
      url: 'https://thehorizonsun.com/wp-content/uploads/2020/12/pasted-image-0-10-1.png',
      location: 'Norrtälje Prison - Norrtälje, Sweden',
    },
    {
      url: 'https://live-production.wcms.abc-cdn.net.au/dd774ed2d1e95d7e55474f77e832644c?impolicy=wcms_crop_resize&cropH=2333&cropW=3499&xPos=0&yPos=0&width=862&height=575',
      location: 'Halden Prison - Halden, Norway',
    },
    {
      url: 'https://preview.redd.it/thoughts-on-scandinavias-luxury-prisons-v0-z5vmiagk59x71.png?width=976&format=png&auto=webp&s=a036bb4d335f37ab30e653cc5982be4ab1514d9f',
      location: 'Halden Prison - Halden, Norway',
    },
    {
      url: 'https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_700/MTc2MjQ4NTQ1NTg5MzM5NTYx/most-luxurious-prisons-in-the-world-that-let-you-wish-you-were-incarcerated.webp',
      location: 'Sollentuna Prison, Sollentuna, Sweden',
    },
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Game } from './game';

describe('Game', () => {
  let component: Game;
  let fixture: ComponentFixture<Game>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Game],
    }).compileComponents();

    fixture = TestBed.createComponent(Game);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with 10 game images', () => {
    expect(component.gameImages.length).toBe(10);
  });

  it('should have 5 dorms and 5 prisons', () => {
    const dorms = component.gameImages.filter((img) => img.type === 'dorm');
    const prisons = component.gameImages.filter((img) => img.type === 'prison');
    expect(dorms.length).toBe(5);
    expect(prisons.length).toBe(5);
  });

  it('should start in playing state', () => {
    expect(component.gameState).toBe('playing');
    expect(component.currentIndex).toBe(0);
    expect(component.score).toBe(0);
  });
});

import './style.css';
import { boot } from './game.js';
import { generateWorld } from './world.js';

generateWorld();
boot(document.getElementById('game'));

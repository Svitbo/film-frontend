import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  slides = [
    {img: '/assets/img/slide1.jpg', title: 'Avatar', description: 'Journey to the stunning world of Pandora, where nature and technology collide in an epic adventure.'},
    {img: '/assets/img/slide2.jpg', title: 'Frozen', description: 'Experience the magic of Arendelle as two sisters discover the true power of love and family.'},
    {img: '/assets/img/slide3.jpg', title: 'Rapunzel', description: 'Follow Rapunzel on a whimsical journey of self-discovery, courage, and her dreams beyond the tower.'}
  ];

  slideConfig = {
    "slidesToShow": 1, 
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 5000,
    "infinite": true,
    "arrows": true
  };
}

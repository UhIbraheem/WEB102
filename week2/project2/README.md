# WEB102 Prework - Programming Flashcards

Submitted by: **Ibraheem Mohammad**

This web app is a study tool for programming fundamentals, covering topics like HTML, CSS, JavaScript, arrays, and APIs. I built this to help myself and other students review key concepts in a more interactive way.

Time spent: **5** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The title of the card set and some information are displayed**
- [x] **A single card at a time is displayed, only showing one of the components of the information pair**
- [x] **A list of card pairs is created**
- [x] **Clicking on the card shows the corresponding component of the information pair**
- [x] **Clicking the next button displays a random new card**

The following **optional** features are implemented:

- [x] Cards have different visual styles such as color based on their category
  - Added a glassmorphism design with semi-transparent backgrounds and blur effects
- [x] A counter displays the user's current and longest streak of correct responses
  - Implemented a "Card X of Y" counter to track progress through the deck

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='https://i.imgur.com/Jh5Z2rx.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

If the GIF doesn't display:[click here to view it directly](https://i.imgur.com/Jh5Z2rx.gif)

GIF created with LICEcap

## Notes

The main challenge I faced was understanding how React state works and how to properly pass data between components using props and also updating them properly. I struggled with getting the card flip animation to work smoothly, but after some trial and error with the useState hook i got it working. The CSS glassmorphism effect took longer than expected because I had to adjust the opacity and blur values multiple times to get the right look but online resources helped a lot.

## License

    Copyright 2026 Ibraheem Mohammad

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

# WEB102 Project 3 - Programming Flashcards

Submitted by: **Ibraheem Mohammad**

This web app is a programming flashcard study tool. Users can flip cards, move forward/backward through the deck, type an answer, and check if it matches the expected result.

Time spent: **5** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **A set of flashcards is displayed with a title/description**
- [x] **One card is shown at a time**
- [x] **Clicking a card flips between question and answer**
- [x] **Users can move between cards with navigation buttons**
- [x] Users can type an answer before revealing/checking
- [x] Answer checking gives immediate correct/incorrect feedback
- [x] Card UI changes based on feedback state

## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='https://i.imgur.com/QGf5vSl.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

If the GIF doesn't display: [click here to view it directly](https://i.imgur.com/QGf5vSl.gif)

GIF created with LICEcap

## Notes

The most challenging part was managing multiple pieces of state at once (current card, user input, and feedback). I solved this by resetting answer/feedback each time users move to a new card, and by normalizing text before answer comparison. AI was pivitol for me being able to debug and grasp these concepts tailored to where i was struglling.


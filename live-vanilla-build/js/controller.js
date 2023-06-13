import Model from "./model.js";
import View from "./view.js";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const model = new Model("live-t3-storage-key", players);

  // Current tab state changes
  model.addEventListener("statechange", () => {
    view.render(model.game, model.stats);
  });

  // A different tab state changes
  window.addEventListener("storage", () => {
    console.log("State changed from another tab");
    view.render(model.game, model.stats);
  });

  // The first load of the document
  view.render(model.game, model.stats);

  view.bindGameResetEvent((event) => {
    model.reset();
  });

  view.bindNewRoundEvent((event) => {
    model.newRound();
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = model.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    // Advance to the next state by pushing a move to the moves array
    model.playerMove(+square.id);
  });
}

window.addEventListener("load", init);

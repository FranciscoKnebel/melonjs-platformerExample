
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(640, 480, { wrapper : "screen", scale : "flex-width" })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // set a global fading transition for the screen
        me.state.transition("fade", "#FFFFFF", 250);

        // add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);
        me.pool.register("CoinEntity", game.CoinEntity);
        me.pool.register("EnemyEntity", game.EnemyEntity);

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,    "jump", true);
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);


        // Start the game.
        me.state.change(me.state.MENU);
    }
};

// CUSTOM

if (me.sys.touch) {
   /* This code prevents the webview from moving on a swipe */
   preventDefaultScroll = function(e) {
      e.preventDefault();
      window.scroll(0,0);
      return false;
   };
   window.document.addEventListener('touchmove', preventDefaultScroll, false);
}

if (me.sys.touch) {
   window.addEventListener("load", function() {
      setTimeout(function() {
         window.scrollTo(0, 1);
      }, 0);
   });
}

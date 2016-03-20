var Timer = (function() {
    var INTERVAL_TIMER_IN_SECONDS = 1;

    function showTime() {
        var minutes = parseInt(localStorage['timer'] / 60);
        var seconds = localStorage['timer'] % 60;
        if (seconds < 10) {
            $('#timer')
            .text(minutes + ' : 0' + seconds);
        }
        else {
            $('#timer')
            .text(minutes + ' : ' + seconds);
        }
    }

    function Timer(seconds, showResults) {
        this._startSeconds = seconds;
        this._isStop = true;
        this._doThisWhenTimeIsUp = showResults;

        if (!localStorage['timer']) {
            localStorage.setItem(
                'timer', seconds
            );
        }
        showTime();
    }

    Timer.prototype.start = function() {
        if (this._isStop) {
            var _this=this;
            this._clock = setInterval(function() {
                                          localStorage.setItem(
                                              'timer', localStorage['timer'] -= INTERVAL_TIMER_IN_SECONDS
                                          );

                                          showTime();

                                          if (localStorage['timer'] == 0) {
                                              _this.stop();
                                              if (_this._doThisWhenTimeIsUp) {
                                                  _this._doThisWhenTimeIsUp();
                                              }
                                          }
                                      },
                                      INTERVAL_TIMER_IN_SECONDS * 1000
            );
            this._isStop = false;
        }
    };

    Timer.prototype.stop = function() {
        clearInterval(this._clock);
        delete localStorage['timer'];
        this._isStop = true;
    };

    return Timer;
})();



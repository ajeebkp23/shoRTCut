// Generated by CoffeeScript 1.6.3
(function() {
  var LocalChannel, RTCTest, RemoteChannel, chat, send,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  chat = function(text) {
    var $sb;
    $sb = $('.scrollback');
    $sb.append($('<div>').text(text));
    return $sb.stop(true, true).animate({
      scrollTop: $sb.prop('scrollHeight') - $sb.height()
    });
  };

  send = null;

  RemoteChannel = (function(_super) {
    __extends(RemoteChannel, _super);

    function RemoteChannel() {
      RemoteChannel.__super__.constructor.apply(this, arguments);
      send = this.send.bind(this);
    }

    RemoteChannel.prototype.open = function() {
      RemoteChannel.__super__.open.apply(this, arguments);
      return chat('Connected');
    };

    RemoteChannel.prototype.close = function() {
      RemoteChannel.__super__.close.apply(this, arguments);
      return chat('Connection closed.');
    };

    return RemoteChannel;

  })(ShoRTCut.prototype.Channel);

  LocalChannel = (function(_super) {
    __extends(LocalChannel, _super);

    function LocalChannel() {
      LocalChannel.__super__.constructor.apply(this, arguments);
    }

    LocalChannel.prototype.open = function() {
      LocalChannel.__super__.open.apply(this, arguments);
      return $('input[name=local]').attr('disabled', null).on('keyup', function(e) {
        if (e.keyCode === 13 && $(this).val()) {
          send('CHAT', $(this).val());
          chat('me   < ' + $(this).val());
          return $(this).val('');
        }
      });
    };

    LocalChannel.prototype.CHAT = function(message) {
      return chat('peer > ' + message);
    };

    LocalChannel.prototype.close = function() {
      LocalChannel.__super__.close.apply(this, arguments);
      return $('input[name=local]').attr('disabled', 'disabled').off('keyup');
    };

    return LocalChannel;

  })(ShoRTCut.prototype.Channel);

  RTCTest = (function(_super) {
    __extends(RTCTest, _super);

    function RTCTest() {
      RTCTest.__super__.constructor.apply(this, arguments);
      this.LocalChannel = LocalChannel;
      this.RemoteChannel = RemoteChannel;
    }

    RTCTest.prototype.assign_local_stream_url = function(url) {
      return $('video.local').attr('src', url);
    };

    RTCTest.prototype.assign_remote_stream_url = function(url) {
      return $('video.remote').attr('src', url);
    };

    return RTCTest;

  })(ShoRTCut);

  $(function() {
    var rtctest;
    rtctest = new RTCTest();
    rtctest.start();
    return chat('Connecting...');
  });

}).call(this);

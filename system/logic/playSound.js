// jQuery playSound by Alexander Manzyuk
// Usage: $.playSound("http://example.org/sound");

(function ($) {

	$.extend({
		playSound: function () {

			return $("<embed src='" + arguments[0] + ".mp3' hidden='true' autostart='true' loop='false' class='playSound-embed'>" + "<audio autoplay='autoplay' style='display: none;' controls='controls' class='playSound-audio'><source src='" + arguments[0] + ".mp3'/><source src='" + arguments[0] + ".ogg'/></audio>").appendTo("body");

		}
	});

})(jQuery);

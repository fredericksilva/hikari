// almond 0.1.3 by The Dojo Foundation // domready by Dustin Diaz // based on Terminus.js by Ramón Lamana // jsBase by A. Matías Quezada
(function (e) {

	var t, n, r;

	(function (e) {

		function c(e, t) {

			var
			n, r, i, s, o, u, f, l, c, h, p = t && t.split("/"),
			d = a.map,
			v = d && d["*"] || {};

			if (e && e.charAt(0) === "." && t) {
				p = p.slice(0, p.length - 1), e = p.concat(e.split("/"));

				for (l = 0; l < e.length; l += 1) {
					h = e[l];
					if (h === ".") e.splice(l, 1), l -= 1;

					else if (h === "..") {
						if (l === 1 && (e[2] === ".." || e[0] === "..")) return !0;
						l > 0 && (e.splice(l - 1, 2), l -= 2);
					}
				}

				e = e.join("/");
			}

			if ((p || v) && d) {
				n = e.split("/");

				for (l = n.length; l > 0; l -= 1) {
					r = n.slice(0, l).join("/");
					if (p)
						for (c = p.length; c > 0; c -= 1) {
							i = d[p.slice(0, c).join("/")];

							if (i) {
								i = i[r];

								if (i) {
									s = i, o = l;
									break;
								}
							}
						}

					if (s) break;
					!u && v && v[r] && (u = v[r], f = l);
				}!s && u && (s = u, o = f), s && (n.splice(0, o, s), e = n.join("/"));
			}

			return e;

		}

		function h(t, n) {
			return function () {
				return s.apply(e, l.call(arguments, 0).concat([t, n]));
			};
		}

		function p(e) {
			return function (t) {
				return c(t, e);
			};
		}

		function d(e) {
			return function (t) {
				o[e] = t;
			};
		}

		function v(t) {
			if (u.hasOwnProperty(t)) {
				var n = u[t];
				delete u[t], f[t] = !0, i.apply(e, n);
			}

			if (!o.hasOwnProperty(t)) throw new Error("No " + t);
			return o[t];
		}

		function m(e, t) {
			var n, r, i = e.indexOf("!");

			return i !== -1 ? (n = c(e.slice(0, i), t), e = e.slice(i + 1), r = v(n), r && r.normalize ? e = r.normalize(e, p(t)) : e = c(e, t)) : e = c(e, t), {
				f: n ? n + "!" + e : e,
				n: e,
				p: r
			};
		}

		function g(e) {
			return function () {
				return a && a.config && a.config[e] || {};
			};
		}

		var i, s, o = {}, u = {}, a = {}, f = {}, l = [].slice;

		i = function (t, n, r, i) {

			var s, a, l, c, p, y = [], b;

			i = i || t;

			if (typeof r == "function") {
				n = !n.length && r.length ? ["require", "exports", "module"] : n;

				for (p = 0; p < n.length; p += 1) {
					c = m(n[p], i), a = c.f;
					if (a === "require") y[p] = h(t);
					else if (a === "exports") y[p] = o[t] = {}, b = !0;

					else if (a === "module") s = y[p] = {
						id: t,
						uri: "",
						exports: o[t],
						config: g(t)
					};

					else if (o.hasOwnProperty(a) || u.hasOwnProperty(a)) y[p] = v(a);
					else if (c.p) c.p.load(c.n, h(i, !0), d(a), {}), y[p] = o[a];
					else if (!f[a]) throw new Error(t + " missing " + a);
				}

				l = r.apply(o[t], y);

				if (t)
					if (s && s.exports !== e && s.exports !== o[t]) o[t] = s.exports;
					else if (l !== e || !b) o[t] = l;
			} else t && (o[t] = r);

		}, t = n = s = function (t, n, r, o, u) {

			return typeof t == "string" ? v(m(t, n).f) : (t.splice || (a = t, n.splice ? (t = n, n = r, r = null) : t = e), n = n || function () {}, typeof r == "function" && (r = o, o = u), o ? i(e, t, n, r) : setTimeout(function () {
				i(e, t, n, r);
			}, 15), s);

		}, s.config = function (e) {
			return a = e, s;
		}, r = function (e, t, n) {
			t.splice || (n = t, t = []), u[e] = [e, t, n];
		}, r.amd = {
			jQuery: !0
		};

	})(), r("applications/terminal/vendor/almond", function () {}), ! function (e, t) {

		typeof module != "undefined" ? module.exports = t() : typeof r == "function" && typeof r.amd == "object" ? r("applications/terminal/vendor/domready", t) : this[e] = t();

	}("domready", function (e) {

		function h(e) {
			c = 1;
			while (e = t.shift()) e();
		}

		var
		t = [],
		n, r = !1,
		i = document,
		s = i.documentElement,
		o = s.doScroll,
		u = "DOMContentLoaded",
		a = "addEventListener",
		f = "onreadystatechange",
		l = "readyState",
		c = /^loade|c/.test(i[l]);

		return i[a] && i[a](u, n = function () {
			i.removeEventListener(u, n, r), h();
		}, r), o && i.attachEvent(f, n = function () {
			/^c/.test(i[l]) && (i.detachEvent(f, n), h());
		}), e = o ? function (n) {
			self != top ? c ? n() : t.push(n) : function () {

				try {
					s.doScroll("left");
				} catch (t) {
					return setTimeout(function () {
						e(n);
					}, 50);
				}

				n();

			}();
		} : function (e) {
			c ? e() : t.push(e);
		};

	}), r("applications/terminal/core/events", [], function () {

		var e = function () {
			this.__listeners = {};
		};

		return e.prototype = {
			on: function (e, t, n) {

				this.__listeners[e] || (this.__listeners[e] = []), t || console.error("events.on(): The listener doesn't exist"), this.__listeners[e].push(t.bind(n ? n : this));

			},

			emit: function () {

				var e, t = Array.prototype.slice.call(arguments);
				arguments.length === 0 && console.error("Events.emit(): Incorrect number of parameters"), e = arguments[0];
				if (!this.__listeners[e]) return;
				t.shift();
				for (var n = this.__listeners[e].length; n--;) this.__listeners[e][n].apply(null, t);

			}
		}, e;

	}), r("applications/terminal/core/promise", ["require"], function (e) {

		function n() {
			this._ondone = [], this._onerror = [], this._onprogress = [], this._state = "unfulfilled", this._args = null;
		}

		function r(e, t) {
			setTimeout(function () {

				if (typeof e == "function") return e.apply(null, t);
				for (var n = 0, r = e.length; n < r; n++) e[n].apply(null, t);

			}, 0);
		}

		function i(e) {

			switch (e) {
				case "unfulfilled":
					return !0;
				case "canceled":
					return !1;
				case "fulfilled":
					throw new Error("Promise is done");
				case "failed":
					throw new Error("Promise is failed");
				default:
					throw new Error("Invalid promise state " + e);
			}

		}

		function s(e, n, r, i, s) {

			n.then(function () {

				i[r] = !0, s[r] = t.call(arguments);
				if (!e.isOpen()) return;

				for (var n = i.length; n--;)
					if (!i[n]) return;

				e.done.apply(e, s);

			}, function () {
				e.isOpen() && e.fail.apply(e, arguments);
			});

		}

		function o(e, t, r, i) {

			if (r === t.length) return e.done.apply(e, i);
			var s = t[r].apply(null, i);

			s instanceof n ? s.then(function () {
				nextSecuencial(e, t, r + 1, arguments);
			}, function (t) {
				e.fail.apply(e, arguments);
			}) : nextSecuencial(e, t, r + 1, [s]);

		}

		var t = Array.prototype.slice;

		return n.prototype = {
			constructor: n,
			done: function (e) {
				i(this._state) && (this._state = "fulfilled", this._args = t.call(arguments), r(this._ondone, this._args));
			},
			fail: function (e) {
				if (i(this._state)) {
					this._state = "failed";
					if (this._onerror.length === 0) throw new Error("Promise failed without handler.");
					this._args = t.call(arguments), r(this._onerror, this._args);
				}
			},
			progress: function (e) {
				if (this.isCanceled()) return;
				for (var t = 0, n = this._onprogress.length; t < n; t++) this._onprogress[t].apply(null, arguments);
			},
			onDone: function (e) {
				return typeof e == "function" && (this.isDone() ? r(e, this._args) : this._ondone.push(e)), this;
			},
			onFail: function (e) {
				return typeof e == "function" && (this.isFailed() ? r(e, this._args) : this._onerror.push(e)), this;
			},
			onProgress: function (e) {
				return typeof e == "function" && this._onprogress.push(e), this;
			},
			then: function (e, t, n) {
				return this.onDone(e), this.onFail(t), this.onProgress(n), this;
			},
			cancel: function () {
				this._state = "canceled";
			},
			isCanceled: function () {
				return this._state === "canceled";
			},
			isDone: function () {
				return this._state === "fulfilled";
			},
			isFailed: function () {
				return this._state === "failed";
			},
			isOpen: function () {
				return this._state === "unfulfilled";
			}
		}, typeof Base == "function" && (n = Base.extend(n.prototype)), n.done = function () {
			var e = new n;
			return e.done.apply(e, arguments), e;
		}, n.failed = function () {
			var e = new n;
			return e.fail.apply(e, arguments), e;
		}, n.parallel = function (e) {
			var r = new n,
				i = [],
				o = [];
			arguments.length > 1 && (e = t.call(arguments));
			var u = o.length = e.length;
			if (u === 0) return n.done();
			for (var a = 0; a < u; a++) s(r, e[a], a, o, i);
			return r;
		}, n.serial = function (e) {
			var r = new n;
			return arguments.length > 1 && (e = t.call(arguments)), e.length === 0 ? n.done() : (o(r, e, 0, []), r);
		}, n;
	}), r("applications/terminal/core/util", [], function () {

		var e = {
			String: {
				htmlEntities: function (e) {
					return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
				},
				htmlStrip: function (e) {
					return String(e).replace(/&/g, "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
				}
			},
			Array: {
				merge: function () {
					var e = [];
					for (var t = 0; t < arguments.length; t++) {
						var n = arguments[t];
						for (var r = 0; r < n.length; r++) e.indexOf(n[r]) === -1 && e.push(n[r]);
					}
					return e;
				}
			},
			Styles: {
				hasClass: function (e, t) {
					return e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"));
				},
				addClass: function (e, t) {
					this.hasClass(e, t) || (e.className += " " + t);
				},
				removeClass: function (e, t) {
					if (this.hasClass(e, t)) {
						var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
						e.className = e.className.replace(n, " ");
					}
				}
			}
		};

		return e;

	}), r("applications/terminal/ui/input", ["require", "applications/terminal/core/events", "applications/terminal/core/util"], function (e) {

		var
		t = e("applications/terminal/core/events"),
		n = e("applications/terminal/core/util"),
		r = function (e) {

			var n = this;

			this.settings = { editable: !1 };
			for (var r in e) e.hasOwnProperty(r) && (this.settings[r] = e[r]);

			this.events = new t, this.$el = document.createElement("div"), this.$el.className = "dekaojs-input", this.$el.innerHTML = "", !this.settings.editable || (this.$el.contentEditable = !0, this.$el.addEventListener("keydown", function (e) {

				switch (e.keyCode) {
					case 13:
						e.preventDefault(), e.stopPropagation(), n.events.emit("enter", n);
				}

			}));

		};

		return r.prototype = {
			get value() {
				var e = this.$el.innerText || this.$el.textContent,
					t = e ? e.replace(/\n/g, "") : "";
				return t = t.replace(/^\s+|\s+$/g, ""), t;
			}, set value(e) {
				return this.$el.innerHTML = e, this.focus(), this
			}, set editable(e) {
				e = !! e, this.settings.editable = e, this.$el.contentEditable = e;
			}, get editable() {
				return this.settings.editable;
			}, appendTo: function (e) {
				return e.appendChild(this.$el), this;
			},
			focus: function () {
				return this.$el.focus(), this.placeCursorToEnd(), this.events.emit("focus", this), this;
			},
			clear: function () {
				return this.value = "", this;
			},
			isVisible: function () {
				return this.$el.style.display !== "none" && n.Styles.hasClass(this.$el, "dekaojs-box");
			},
			placeCursorToEnd: function () {
				var e, t;
				return document.createRange && (e = document.createRange(), e.selectNodeContents(this.$el), e.collapse(!1), t = window.getSelection(), t.removeAllRanges(), t.addRange(e)), this;
			}
		}, r;
	}), r("applications/terminal/ui/prompt", ["require", "applications/terminal/core/events", "applications/terminal/core/util", "applications/terminal/ui/input"], function (e) {
		var t = e("applications/terminal/core/events"),
			n = e("applications/terminal/core/util"),
			r = e("applications/terminal/ui/input"),
			i = function (e) {
				var n = this;
				this.settings = {
					editable: !1,
					ps: ">"
				};
				for (var i in e) e.hasOwnProperty(i) && (this.settings[i] = e[i]);
				this.events = new t, this.$el = document.createElement("div"), this.$el.className = "dekaojs-prompt", this.$el.className += " dekaojs-box", this.$ps = document.createElement("div"), this.$ps.className = "dekaojs-ps", this.$el.appendChild(this.$ps), this.input = new r(e), this.input.appendTo(this.$el), !this.settings.editable || this.input.$el.addEventListener("keydown", function (e) {
					switch (e.keyCode) {
						case 13:
							e.preventDefault(), e.stopPropagation(), n.events.emit("enter", n.input);
							break;
						case 38:
							n.events.emit("historyBack", n.input), e.preventDefault(), e.stopPropagation();
							break;
						case 40:
							n.events.emit("historyForward", n.input), e.preventDefault(), e.stopPropagation();
							break;
						case 9:
							n.events.emit("autocomplete", n.input), e.preventDefault(), e.stopPropagation()
					}
				}), this.ps = this.settings.ps
			};
		return i.prototype = {
			set ps(e) {
				return this.settings.prompt = e, this.$ps.innerHTML = e, this
			}, get ps() {
				return this.settings.prompt
			}, appendTo: function (e) {
				return e.appendChild(this.$el), this
			},
			show: function () {
				return n.Styles.removeClass(this.$el, "hidden"), this
			},
			hide: function () {
				return n.Styles.addClass(this.$el, "hidden"), this
			},
			isVisible: function () {
				return this.$el.style.display !== "none" && n.Styles.hasClass(this.$el, "dekaojs-box")
			}
		}, i
	}), r("applications/terminal/ui/outputline", ["require", "applications/terminal/core/util"], function (e) {
		var t = e("applications/terminal/core/util"),
			n = !1,
			r = function () {
				var e, n = this.element = document.createElement("div");
				n.className = "dekaojs-output-line", t.Styles.addClass(n, "animate"), e = this.outputContent = document.createElement("div"), e.className = "dekaojs-output-content", n.appendChild(e), window.scrollTo(0, document.body.scrollHeight)
			};
		return r.prototype = {
			element: null,
			outputContent: null,
			appendTo: function (e) {
				return e.appendChild(this.element), this
			},
			setContent: function (e) {
				this.outputContent.innerHTML = e
			},
			show: function () {
				var e = this,
					r = function () {
						t.Styles.addClass(e.element, "visible"), e.element.style.height = n ? e.outputContent.clientHeight + "px" : "auto"
					};
				n ? setTimeout(r, 30) : r.call(this)
			},
			hide: function () {
				t.Styles.removeClass(this.element, "visible"), this.element.style.height = "0"
			}
		}, r
	}), r("applications/terminal/ui/output", ["require", "applications/terminal/core/util", "applications/terminal/ui/outputline"], function (e) {
		var t = e("applications/terminal/core/util"),
			n = e("applications/terminal/ui/outputline"),
			r = function () {
				this.element = document.createElement("div"), this.element.className = "dekaojs-output"
			};
		return r.prototype = {
			print: function (e, n) {
				var r;
				n = n || "stdout";
				switch (n) {
				case "stdout":
					r = this._print(t.String.htmlEntities(e).replace(/\n/g, "<br/>"), "dekaojs-stdout");
					break;
				case "stderr":
					r = this._print(t.String.htmlEntities(e).replace(/\n/g, "<br/>"), "dekaojs-stderr");
					break;
				case "web":
					r = this._print(e, "dekaojs-web")
				}
				return r.show(), this
			},
			clear: function () {
				this.element.innerHTML = ""
			},
			appendTo: function (e) {
				return e.appendChild(this.element), this
			},
			_print: function (e, t) {
				var r = new n(t);
				return r.appendTo(this.element), r.setContent(e), r
			}
		}, r
	}), r("applications/terminal/ui/display", ["require", "applications/terminal/core/events", "applications/terminal/core/promise", "applications/terminal/core/util", "applications/terminal/ui/prompt", "applications/terminal/ui/input", "applications/terminal/ui/output"], function (e) {

		var t = e("applications/terminal/core/events"),
			n = e("applications/terminal/core/promise"),
			r = e("applications/terminal/core/util"),
			i = e("applications/terminal/ui/prompt"),
			s = e("applications/terminal/ui/input"),
			o = e("applications/terminal/ui/output"),
			u = function (e, n) {
				var s = this;
				e || (this.$el = document.createElement("div"), document.body.appendChild(this.$el)), this.events = new t;
				for (var u in n) n.hasOwnProperty(u) && (this.settings[u] = n[u]);
				this.$el = e, r.Styles.addClass(this.$el, "dekaojs"), this.output = new o, this.output.appendTo(this.$el), this.prompt = new i({
					editable: !0
				}), this.prompt.appendTo(this.$el).show(), this.prompt.events.on("enter", this.enter, this), this.prompt.events.on("historyBack", this.historyBack, this), this.prompt.events.on("historyForward", this.historyForward, this), this.prompt.events.on("autocomplete", this.autocomplete, this), this.prompt.events.on("focus", function () {}, this), this._currentInput = this.prompt.input, this.$el.addEventListener("keydown", function (e) {
					e.ctrlKey && e.keyCode === 90 && s.cancel()
				}), this.output.print(this.settings.welcome, "web"), this.showPrompt(), e.addEventListener("click", function () {
					s.focus()
				}), !this.settings.shell || this.connectShell(this.settings.shell), this._historyIndex = 0
			};
		return u.prototype = {
			_shell: null,
			_historyIndex: 0,
			_currentInput: null,
			settings: {
				welcome: "<p>Dekao.js<br/>Copyright 2014 Paul Anthony Webb.</p>"
			},
			focus: function () {
				this._currentInput.focus()
			},
			historyReset: function () {
				this._historyIndex = this._shell.history.length
			},
			historyBack: function () {
				this._historyIndex--;
				var e = this._shell.history[this._historyIndex];
				e ? this.prompt.input.value = e : this._historyIndex = 0
			},
			historyForward: function () {
				this._historyIndex++;
				var e = this._shell.history[this._historyIndex];
				e ? this.prompt.input.value = e : this.historyReset()
			},
			showPrompt: function (e) {
				this.prompt.input.clear(), typeof e != "undefined" && (this.prompt.input.value = e), this.prompt.show(), this.prompt.input.focus(), this.events.emit("prompt")
			},
			idle: function () {
				this.prompt.hide(), this.$el.focus()
			},
			cancel: function () {
				this.prompt.show(), this._currentInput = this.prompt.input, this.focus()
			},
			enter: function (e) {
				var t = e.value,
					r = new n,
					i = this;
				this._printPrompt(), this.idle(), r.then(function () {
					i.showPrompt()
				});
				if (t === "") {
					r.done();
					return
				}!this._shell || this._shell.exec(t).then(function () {
					r.done()
				}), this.historyReset()
			},
			autocomplete: function (e) {
				var t = this._shell.search(e.value);
				t.length > 1 ? (this._printPrompt(), this.output.print(t.join(" "), "stdout"), this.showPrompt(e.value)) : t.length === 1 && this.showPrompt(t[0])
			},
			connectShell: function (e) {
				var t = e.streams;
				this._shell = e, t.stdout.events.on("write", function (e) {
					this.output.print(e, "stdout")
				}, this), t.stderr.events.on("write", function (e) {
					this.output.print(e, "stderr")
				}, this), t.web.events.on("write", function (e) {
					this.output.print(e, "web")
				}, this), this._shell.bus.on("clear", this.output.clear, this.output), t.stdin.reader = this.reader.bind(this), this.historyReset()
			},
			reader: function (e) {
				var t = new s({
					editable: !0
				});
				this._currentInput = t, t.appendTo(this.$el).focus(), t.events.on("enter", function (t) {
					var n = t.value;
					e.done(n), this.output.print(n), t.editable = !1, this.$el.removeChild(t.$el), this._currentInput = this.prompt.input
				}, this)
			},
			_printPrompt: function () {
				var e = new i;
				e.ps = this.prompt.ps, e.input.value = this.prompt.input.value, e.show(), this.output.print(e.$el.outerHTML, "web")
			}
		}, u

	}), r("applications/terminal/io/outputstream", ["require", "applications/terminal/core/events"], function (e) {

		var t = e("applications/terminal/core/events"),
			n = function () {
				this.events = new t, this.close = !1, this._buffer = [], this.writer = function (e) {
					this._buffer.push(e)
				}
			};
		return n.prototype = {
			events: null,
			set close(e) {
				if (this._close) return;
				e === !0 && this.events.emit("close"), this._close = !! e
			},
			get close() {
				return this._close
			},
			set writer(e) {
				this._writer = e
			},
			get writer() {
				return this._writer
			},
			write: function (e) {
				if (this.close) return;
				e += "", this.events.emit("write", e), this._writer.call(this, e)
			}
		}, n

	}), r("applications/terminal/system/process", ["require", "applications/terminal/core/events", "applications/terminal/core/promise", "applications/terminal/io/outputstream"], function (e) {

		var t, n = e("applications/terminal/core/events"),
			r = e("applications/terminal/core/promise"),
			i = e("applications/terminal/io/outputstream"),
			s = {
				list: [],
				register: function (e) {
					return e instanceof t || console.error("Trying to register a non Process object"), this.list.push(e), this.list.length - 1
				}
			};
		return t = function (e) {
			this.pid = s.register(this), this.events = new n, this.streams = e, this.bus = t.bus, this._promise = new r
		}, t.bus = new n, t.prototype = {
			pid: null,
			bus: null,
			_promise: null,
			toString: function () {
				return "[Process:" + this.pid + "]"
			},
			read: function () {
				return this.streams.stdin.read()
			},
			write: function (e, t) {
				var n;
				t = t || "stdout", typeof t == "string" && (t = t.toLowerCase()), t instanceof i ? n = t : t !== "stdin" && (n = this.streams[t]);
				if (!n) {
					console.error(this.toString() + " Method write(): The target '" + t + "' is not a valid stream");
					return
				}
				n.write(e)
			},
			exit: function (e) {
				this._promise.done(e)
			},
			exec: function (e, t) {
				return typeof e != "function" && (console.error(this.toString + ": Could not execute process " + "because the given command is not a function"), this.exit(1)), e.apply(this, t), this._promise
			}
		}, t

	}), r("applications/terminal/io/inputstream", ["require", "applications/terminal/core/promise", "applications/terminal/core/events"], function (e) {

		var t = e("applications/terminal/core/promise"),
			n = e("applications/terminal/core/events"),
			r = function () {
				this.events = new n, this._buffer = [], this.reader = function (e) {
					var t = this._buffer.join("");
					this._buffer = [], e.done(t)
				}
			};
		return r.prototype = {
			events: null,
			read: function () {
				var e = new t;
				return this._reader.call(this, e), this.events.emit("read"), e
			},
			set reader(e) {
				this._reader = e
			},
			get reader() {
				return this._reader
			},
			pipe: function (e) {
				var t = this;
				return e.writer = function (e) {
					t._buffer.push(e)
				}, this
			}
		}, r

	}), r("applications/terminal/system/shell", ["require", "applications/terminal/core/util", "applications/terminal/core/promise", "applications/terminal/system/process", "applications/terminal/io/inputstream", "applications/terminal/io/outputstream"], function (e) {

		var
		t = e("applications/terminal/core/util"),
		n = e("applications/terminal/core/promise"),
		r = e("applications/terminal/system/process"),
		i = e("applications/terminal/io/inputstream"),
		s = e("applications/terminal/io/outputstream"),
		o = function (e) {

			this._environment = {}, e && this.include(e), this.streams = {
				stdin: new i,
				stdout: new s,
				stderr: new s,
				web: new s
			}, this.bus = r.bus, this.streams.stdin.id = "STDIN", this.streams.stdout.id = "STDOUT", this.commands = [], this.history = []

		};

		return o.prototype = {
			commands: null,
			streams: null,
			bus: null,
			history: null,
			_environment: null,
			getEnv: function (e) {
				return this._environment[e] ? this._environment[e] : null
			},

			exec: function (e) {

				var
				t, o, u = [],
				a = {
					stdin: this.streams.stdin,
					stdout: this.streams.stdout,
					stderr: this.streams.stderr,
					web: this.streams.web
				};

				return this.history.push(e), o = this._parse(e), o.forEach(function (e, f) {

					var l, c;

					f < o.length - 1 ? (a.stdout = new s, c = (new i).pipe(a.stdout)) : (a.stdout = this.streams.stdout, c = null), l = function (i) {

						if (this.native[e.name]) return this.native[e.name].apply(this, e.args), n.done();

						for (var s = this.commands.length; s--;) {
							t = this.commands[s];

							if (t[e.name]) {
								var o = new r(i);
								return o.exec(t[e.name], e.args)
							}
						}

						return this.streams.stderr.write("Command '" + e.name + "' not found."), n.done()

					}.call(this, a), c && (a.stdin = c), u.push(l)

				}, this), n.parallel(u)

			},

			search: function (e) {

				var
				n = [],
				r = [];

				for (var i = this.commands.length; i--;) r = t.Array.merge(r, Object.keys(this.commands[i]));
				var s = new RegExp("^" + e, "i");
				for (var o = r.length; o--;) s.test(r[o]) && n.push(r[o]);

				return n

			},

			include: function (e) {
				this.commands = this.commands.concat(e)
			},

			_parse: function (e) {

				var t = e.split("|");

				return t.map(function (e) {

					var t = e.trim().split(" ");

					return e = t[0], t.shift(), {
						name: e,
						args: t
					}

				})

			},

			"native": {
				history: function () {
					var e = "";
					for (var t = 0, n = this.history.length; t < n; t++) e += " " + t + ": " + this.history[t] + "\n";
					this.streams.stdout.write(e)
				},
				clear: function () {
					this.bus.emit("clear")
				}
			}
		}, o

	}), r("dekao", ["require", "applications/terminal/vendor/domready", "applications/terminal/ui/display", "applications/terminal/system/shell", "applications/terminal/system/process"], function (e) {

		var
		t = e("applications/terminal/vendor/domready"),
		n = function (e, r) {

			var i = this;
			this.shell = r.shell || new n.Shell;

			if (!this.shell || !(this.shell instanceof n.Shell)) {
				console.error("Dekao.constructor: Provided shell not valid");
				return
			}

			r.shell = this.shell, t(function () {
				e = typeof e == "string" ? document.querySelector(e) : e, i.display = new n.Display(e, r)
			})

		};

		return n.prototype = {
			set shell(e) {
				this._shell || (this._shell = e)
			}, get shell() {
				return this._shell
			}, set display(e) {
				this._display || (this._display = e)
			}, get display() {
				return this._display
			}
		}, n.version = "0.1", n.Display = e("applications/terminal/ui/display"), n.Shell = e("applications/terminal/system/shell"), n.Process = e("applications/terminal/system/process"), n

	}), e.Dekao = n("dekao")
	
})(window);

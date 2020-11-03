"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yt_search_1 = __importDefault(require("yt-search"));
var ytdl_core_1 = __importDefault(require("ytdl-core"));
var q_1 = __importDefault(require("./q"));
var Player = /** @class */ (function () {
    function Player(options) {
        this.options = options;
        this.q = new q_1.default();
    }
    Object.defineProperty(Player.prototype, "isPlaying", {
        /** Whether the queue is not empty and audio is being emitted. */
        get: function () {
            var _a;
            return !this.q.isEmpty && ((_a = this.connection) === null || _a === void 0 ? void 0 : _a.dispatcher);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "position", {
        /** Position in ms of current track. */
        get: function () {
            var _a;
            return (_a = this.connection) === null || _a === void 0 ? void 0 : _a.dispatcher.streamTime;
        },
        enumerable: true,
        configurable: true
    });
    /** Join a voice channel. */
    Player.prototype.join = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.options.voiceChannel.join()];
                    case 1:
                        _a.connection = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Leave a voice channel. */
    Player.prototype.leave = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.options.voiceChannel.leave();
                this.connection = null;
                return [2 /*return*/];
            });
        });
    };
    /** Move player to another channel. */
    Player.prototype.move = function (voiceChannel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, voiceChannel.join()];
                    case 1:
                        _a.sent();
                        this.options.voiceChannel = voiceChannel;
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Play track from YouTube. */
    Player.prototype.play = function (query) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var videos, video, stream;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, yt_search_1.default(query)];
                    case 1:
                        videos = (_b.sent()).videos;
                        if (videos.length <= 0)
                            throw new TypeError('No results found.');
                        return [4 /*yield*/, this.join()];
                    case 2:
                        _b.sent();
                        video = videos[0];
                        this.q.enqueue(video);
                        stream = ytdl_core_1.default(video.url, { filter: 'audioonly' });
                        (_a = this.connection) === null || _a === void 0 ? void 0 : _a.play(stream, { seek: 0, volume: 1 });
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Set volume from 0 - 200 */
    Player.prototype.setVolume = function (amount) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (!((_a = this.connection) === null || _a === void 0 ? void 0 : _a.dispatcher))
                    throw new TypeError('Player is not playing anything.');
                this.connection.dispatcher.setVolume(amount);
                return [2 /*return*/];
            });
        });
    };
    /** Stop playing and clear queue. */
    Player.prototype.stop = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (!this.isPlaying)
                    throw new TypeError('Player is already stopped.');
                (_a = this.connection) === null || _a === void 0 ? void 0 : _a.disconnect();
                while (!this.q.isEmpty)
                    this.q.dequeue();
                return [2 /*return*/];
            });
        });
    };
    /** Pause playback. */
    Player.prototype.pause = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                (_a = this.connection) === null || _a === void 0 ? void 0 : _a.dispatcher.pause();
                return [2 /*return*/];
            });
        });
    };
    /** Resume playback. */
    Player.prototype.resume = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                (_a = this.connection) === null || _a === void 0 ? void 0 : _a.dispatcher.resume();
                return [2 /*return*/];
            });
        });
    };
    /** Skip one or more tracks. */
    Player.prototype.skip = function (count) {
        if (count === void 0) { count = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var skipped;
            return __generator(this, function (_a) {
                if (count > this.q.length)
                    throw new TypeError('Not enough items to skip.');
                else if (count <= 0)
                    throw new RangeError('Number to skip should be greater than 0');
                skipped = this.q.length > this.q.length - count;
                while (!skipped)
                    this.q.dequeue();
                return [2 /*return*/];
            });
        });
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbXVzaWMvcGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQXdEO0FBQ3hELHdEQUFtQztBQUNuQywwQ0FBb0I7QUFHcEI7SUFjRSxnQkFBb0IsT0FBc0I7UUFBdEIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQWJqQyxNQUFDLEdBQUcsSUFBSSxXQUFDLEVBQVMsQ0FBQztJQWFpQixDQUFDO0lBUjlDLHNCQUFJLDZCQUFTO1FBRGIsaUVBQWlFO2FBQ2pFOztZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sV0FBSSxJQUFJLENBQUMsVUFBVSwwQ0FBRSxVQUFVLENBQUEsQ0FBQztRQUN4RCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDRCQUFRO1FBRFosdUNBQXVDO2FBQ3ZDOztZQUNFLGFBQU8sSUFBSSxDQUFDLFVBQVUsMENBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTtJQUlELDRCQUE0QjtJQUN0QixxQkFBSSxHQUFWOzs7Ozs7d0JBQ0UsS0FBQSxJQUFJLENBQUE7d0JBQWMscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUF4RCxHQUFLLFVBQVUsR0FBRyxTQUFzQyxDQUFDOzs7OztLQUMxRDtJQUVELDZCQUE2QjtJQUN2QixzQkFBSyxHQUFYOzs7Z0JBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDOzs7O0tBQ3hCO0lBRUQsc0NBQXNDO0lBQ2hDLHFCQUFJLEdBQVYsVUFBVyxZQUEwQjs7Ozs0QkFDbkMscUJBQU0sWUFBWSxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBekIsU0FB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
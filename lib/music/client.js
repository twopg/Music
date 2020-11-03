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
var events_1 = require("events");
var player_1 = require("./player");
var yt_search_1 = __importDefault(require("yt-search"));
var MusicClient = /** @class */ (function () {
    function MusicClient() {
        this.players = new Map();
        this.emitter = new events_1.EventEmitter();
    }
    /** Listen to music client events. */
    MusicClient.prototype.on = function (event, listener) {
        this.emitter.on(event, listener);
    };
    /** Get or create a player for a guild. */
    MusicClient.prototype.get = function (options) {
        var _a;
        var guildId = options.voiceChannel.guild.id;
        return (_a = this.players.get(guildId)) !== null && _a !== void 0 ? _a : this.players
            .set(guildId, new player_1.Player(options))
            .get(guildId);
    };
    /** Search YouTube for tracks. */
    MusicClient.prototype.search = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, yt_search_1.default(query)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.videos];
                }
            });
        });
    };
    return MusicClient;
}());
exports.MusicClient = MusicClient;
var player_2 = require("./player");
exports.Player = player_2.Player;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbXVzaWMvY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXNDO0FBQ3RDLG1DQUF3RDtBQUN4RCx3REFBaUM7QUFFakM7SUFBQTtRQUNXLFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUVyQyxZQUFPLEdBQUcsSUFBSSxxQkFBWSxFQUFFLENBQUM7SUFxQnZDLENBQUM7SUFuQkMscUNBQXFDO0lBQ3JDLHdCQUFFLEdBQUYsVUFBRyxLQUF1QixFQUFFLFFBQWtDO1FBQzVELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsMENBQTBDO0lBQzFDLHlCQUFHLEdBQUgsVUFBSSxPQUFzQjs7UUFDeEIsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzlDLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLG1DQUMzQixJQUFJLENBQUMsT0FBTzthQUNaLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxlQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakMsR0FBRyxDQUFDLE9BQU8sQ0FBVyxDQUFDO0lBQzlCLENBQUM7SUFFRCxpQ0FBaUM7SUFDM0IsNEJBQU0sR0FBWixVQUFhLEtBQWE7Ozs7OzRCQUNULHFCQUFNLG1CQUFRLENBQUMsS0FBSyxDQUFDLEVBQUE7O3dCQUE5QixNQUFNLEdBQUcsU0FBcUI7d0JBQ3BDLHNCQUFPLE1BQU0sQ0FBQyxNQUFNLEVBQUM7Ozs7S0FDdEI7SUFDSCxrQkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF4Qlksa0NBQVc7QUEyQnhCLG1DQUF3RDtBQUEvQywwQkFBQSxNQUFNLENBQUEifQ==
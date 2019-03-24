"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var request_status_1 = require("./request-status");
var ProblemSubmissionViewModel = /** @class */ (function (_super) {
    __extends(ProblemSubmissionViewModel, _super);
    function ProblemSubmissionViewModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ProblemSubmissionViewModel;
}(request_status_1.RequestStatus));
exports.ProblemSubmissionViewModel = ProblemSubmissionViewModel;
//# sourceMappingURL=problem-submission-view-model.js.map
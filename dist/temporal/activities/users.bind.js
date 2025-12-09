"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_activities_1 = require("./users.activities");
const mongoose_1 = require("mongoose");
const mailer_1 = require("@nestjs-modules/mailer");
const activitiesInstance = new users_activities_1.UserActivities((mongoose_1.Model), mailer_1.MailerService, jwtService, JwtService);
;
//# sourceMappingURL=users.bind.js.map
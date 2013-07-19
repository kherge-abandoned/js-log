// load modules
require("./Herrera");
require("./Herrera/Log");
require("./Herrera/Log/Entry");
require("./Herrera/Log/Entry/Attribute");
require("./Herrera/Log/Entry/Attributes");

// export modules
exports.log = Herrera.Log;
exports.entry = Herrera.Log.Entry;
exports.attribute = Herrera.Log.Entry.Attribute;
exports.attributes = Herrera.Log.Entry.Attributes;

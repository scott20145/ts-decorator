/* eslint-disable @typescript-eslint/naming-convention */
import { DecoratorConfig } from "./decorator/DecoratorConfig";

export const RegisterDecorator = (object: object, propertyName: string, config: DecoratorConfig) => {
	if (config.decoratorName === "Optional") {
		if (!object["_optional"]) {
			object["_optional"] = {};
		}
		object["_optional"][propertyName] = true;
	}

	if (object["_validation"]) {
		object["_validation"].push(config);
	}
	else {
		Object.defineProperty(object, "_validation", {
			value: [config]
		});
	}
};

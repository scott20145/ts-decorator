import { ErrorCode } from "../models/commonModels/enum";
import { DecoratorConfig } from "./decorator/DecoratorConfig";

class DataValidator {
	public validate(object: object): Promise<any> {
		if (object["_validation"]) {
			const length = object["_validation"].length;
			for (let i = 0; i < length; i++) {
				const decorator: DecoratorConfig = object["_validation"][i];
				// 可選的屬性
				if (decorator.decoratorName === "Optional") {
					continue;
				}
				if (object["_optional"] && object["_optional"][decorator.propertyName] && object[decorator.propertyName] === undefined) {
					continue;
				}
				if (decorator.decoratorName !== "Hook") {
					const code = decorator.exec(object[decorator.propertyName]);
					if (code !== ErrorCode.SUCCESS) {
						return Promise.reject(code);
					}
				}
				else {
					const code = decorator.exec(object);
					if (code !== ErrorCode.SUCCESS) {
						return Promise.reject(code);
					}
				}
			}
			return Promise.resolve(object);
		}
		else {
			return Promise.resolve(object);
		}
	}
}

export const dataValidator = new DataValidator();

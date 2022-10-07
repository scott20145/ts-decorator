/* eslint-disable @typescript-eslint/naming-convention */

import { RegisterDecorator } from "../RegisterDecorator";
import { DecoratorConfig } from "./DecoratorConfig";

/**
 *
 * 如果該屬性有掛載其他資料驗證, 且該屬性為可選的, 應附加此Decorator
 *
 * @export
 * @return {*}  {*}
 */
export function Optional(): any {
	return (object: object, propertyName: string) => {
		const config: DecoratorConfig = {
			decoratorName: "Optional",
			object,
			propertyName,
			exec: null
		};
		RegisterDecorator(object, propertyName, config);
	};
}

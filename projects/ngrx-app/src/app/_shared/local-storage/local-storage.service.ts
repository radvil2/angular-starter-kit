import { Injectable } from '@angular/core';

const APP_PREFIX = 'RAD-';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
	constructor() {}

	static loadInitialState() {
		return Object.keys(localStorage).reduce((state: any, storageKey) => {
			if (storageKey.includes(APP_PREFIX)) {
				const stateKeys = storageKey
					.replace(APP_PREFIX, '')
					.toLowerCase()
					.split('.')
					.map((key) =>
						key
							.split('-')
							.map((token, index) =>
								index === 0
									? token
									: token.charAt(0).toUpperCase() + token.slice(1)
							)
							.join('')
					);

				let currentStateRef = state;
				stateKeys.forEach((key, index) => {
					if (index === stateKeys.length - 1) {
						currentStateRef[key] = JSON.parse(localStorage.getItem(storageKey));
						return;
					}

					currentStateRef[key] = currentStateRef[key] || {};
					currentStateRef = currentStateRef[key];
				});
			}

			return state;
		}, {});
	}

	setItem(key: string, value: any) {
		try {
			localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
		} catch (error) {
			console.error('Failed while saving token to local storage!!', error);
		}
	}

	getItem(key: string) {
		try {
			return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
		} catch (error) {
			console.error('Failed while getting token from localStrorage', error);
		}
	}

	removeItem(key: string) {
		try {
			localStorage.removeItem(`${APP_PREFIX}${key}`);
		} catch (error) {
			console.error('Failed while removing token from local storage!!', error);
		}
	}

	/** Tests that localStorage exists, can be written to, and read from. */
	testLocalStorage() {
		const testValue = 'testValue';
		const testKey = 'testKey';
		let retrievedValue: string;
		const errorMessage = 'Local storage did not return expected value';

		this.setItem(testKey, testValue);
		retrievedValue = this.getItem(testKey);
		this.removeItem(testKey);

		if (retrievedValue !== testValue) {
			throw new Error(errorMessage);
		}
	}
}

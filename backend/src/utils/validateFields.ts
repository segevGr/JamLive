export function validateFields(obj: Record<string, any>, requiredFields: string[]): string | null {
	for (const field of requiredFields) {
	  if (!obj[field]) {
		return `Missing required field: ${field}`;
	  }
	}
	return null;
  }
  
import { promises as fs } from "fs";

export async function readCsv(filePath: string, includeHeaders: boolean): Promise<string[][]> {
	const content = await fs.readFile(filePath, "utf8");
	const rows: string[][] = [];
	let row: string[] = [];
	let field = "";
	let quoted = false;

	for (let i = 0; i < content.length; i++) {
		const character = content[i];
		if (character === '"') {
			if (quoted && content[i + 1] === '"') {
				field += '"';
				i++;
			} else {
				quoted = !quoted;
			}
		} else if (character === "," && !quoted) {
			row.push(field);
			field = "";
		} else if ((character === "\n" || character === "\r") && !quoted) {
			if (character === "\r" && content[i + 1] === "\n") i++;
			row.push(field);
			rows.push(row);
			

			row = [];
			field = "";
		} else {
			field += character;
		}
	}

	if (field !== "" || row.length > 0 || content.endsWith(",")) {
		row.push(field);
		rows.push(row);
	}

	if (!includeHeaders) rows.shift();

	return rows;
}

export async function writeCsv(
	filePath: string,
	data: string[][],
): Promise<void> {
	const csv = data
		.map((row) =>
			row
				.map((value) => {
					const field = String(value);
					return /[",\r\n]/.test(field)
						? `"${field.replace(/"/g, '""')}"`
						: field;
				})
				.join(","),
		)
		.join("\n");

	await fs.writeFile(filePath, csv, "utf8");
}

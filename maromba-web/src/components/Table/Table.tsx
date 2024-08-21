import "./Table.css";
import "../ComponentsStyle.css";
import React, { useEffect, useRef, useState } from "react";

interface Column {
	key: string;
	label: string;
}

interface TableProps {
	columns: Column[];
	data: any;
	handleEdit: (id: string) => void;
	handleDelete: (id: string) => void;
}

export const Table = ({
	columns,
	data,
	handleEdit,
	handleDelete,
}: TableProps) => {
	const [sortKey, setSortKey] = React.useState<string>(columns[0].key);
	const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
	const tableRef = useRef<HTMLTableElement>(null);
	const [showColumns, setShowColumns] = useState<boolean[]>(
		Array(columns.length).fill(true)
	);

	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			handleResize();
		});

		if (tableRef.current) {
			resizeObserver.observe(tableRef.current);
		}

		handleResize();

		return () => {
			if (tableRef.current) {
				resizeObserver.unobserve(tableRef.current);
			}
		};
	}, []);

	useEffect(() => {
		handleResize();
	}, [data, columns]);

	const handleResize = async () => {
		if (tableRef.current) {
			const tableWidth = (tableRef.current.children[0] as HTMLElement)
				.offsetWidth;
			const lastColumnWidth =
				(tableRef.current.querySelector("th:last-child") as HTMLElement)
					?.offsetWidth || 0;
			const rows = tableRef.current.querySelectorAll("tbody tr");

			let currentWidth = 0;
			let biggestWidthColumn: number[] = new Array(columns.length).fill(0);

			let showOldColumn: boolean = true;
			const newShowColumns = columns.map((column, index) => {
				rows.forEach((row) => {
					const cell = row.children[index] as HTMLElement;
					const cellWidth = getTextWidthInCell(cell);
					if (cell && biggestWidthColumn[index] < cellWidth) {
						biggestWidthColumn[index] = cellWidth;
					}
				});

				if (biggestWidthColumn[index] == 0) {
					biggestWidthColumn[index] = 99999;
				}

				const remainingWidth = tableWidth - currentWidth - lastColumnWidth - 20;

				if (
					index == 0 ||
					(biggestWidthColumn[index] <= remainingWidth &&
						remainingWidth - biggestWidthColumn[index] > 20 &&
						showOldColumn)
				) {
					currentWidth += biggestWidthColumn[index];
					showOldColumn = true;
					return showOldColumn;
				} else {
					showOldColumn = false;
					return showOldColumn;
				}
			});

			setShowColumns(newShowColumns);
			handleResizeColumns(newShowColumns);
		}
	};

	const handleResizeColumns = (showColumns: boolean[]) => {
		if (tableRef.current) {
			const table = tableRef.current;
			const ths = table.querySelectorAll("th");
			const rows = table.querySelectorAll("tbody tr");
			const lastColumnWidth =
				(tableRef.current.querySelector("th:last-child") as HTMLElement)
					?.offsetWidth || 0;
			let finalRowWidth = 0;

			columns.forEach(async (column, index) => {
				if (showColumns[index]) {
					let biggestWidth = 0;

					rows.forEach((row) => {
						const cell = row.children[index] as HTMLElement;
						const cellWidth = getTextWidthInCell(cell);
						if (cell && biggestWidth < cellWidth) {
							biggestWidth = cellWidth;
						}
					});

					rows.forEach((row) => {
						const cell = row.children[index] as HTMLElement;
						if (cell) {
							cell.style.width = `${biggestWidth}px`;
							cell.style.maxWidth = `${biggestWidth}px`;
						}
					});

					if (ths[index] && index != ths.length - 1) {
						finalRowWidth += biggestWidth;
						ths[index].style.width = `${biggestWidth}px`;
						ths[index].style.maxWidth = `${biggestWidth}px`;
					}
				}
			});

			const showColumnsLength = showColumns.filter((value) => value);

			const remainingWidthEachColumn =
				((table.children[0] as HTMLElement).offsetWidth -
					finalRowWidth -
					lastColumnWidth) /
				showColumnsLength.length;

			columns.forEach((column, index) => {
				if (index <= showColumnsLength.length - 1) {
					rows.forEach((row) => {
						const cell = row.children[index] as HTMLElement;
						if (cell) {
							cell.style.width = `${
								parseFloat(cell.style.width.replaceAll("px", "")) +
								remainingWidthEachColumn
							}px`;
							cell.style.maxWidth = `${
								parseFloat(cell.style.maxWidth.replaceAll("px", "")) +
								remainingWidthEachColumn
							}px`;
						}
					});

					if (ths[index] && index != ths.length - 1) {
						ths[index].style.width = `${
							parseFloat(ths[index].style.width.replaceAll("px", "")) +
							remainingWidthEachColumn
						}px`;
						ths[index].style.maxWidth = `${
							parseFloat(ths[index].style.maxWidth.replaceAll("px", "")) +
							remainingWidthEachColumn
						}px`;
					}
				}
			});
			(
				tableRef.current.querySelector("th:last-child") as HTMLElement
			).style.width = "66px";
			(
				tableRef.current.querySelector("th:last-child") as HTMLElement
			).style.maxWidth = "66px";
			document.querySelectorAll("td.actionColunm").forEach((cell) => {
				(cell as HTMLElement).style.maxWidth = "66px";
				(cell as HTMLElement).style.width = "66px";
			});
		}
	};

	function getTextWidth(text: string, font: string): number {
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");
		if (context) {
			context.font = font;
			return context.measureText(text).width;
		}
		return 0;
	}

	function getTextWidthInCell(cell: HTMLElement): number {
		if (cell == null) {
			return 0;
		}
		const text = cell.innerText || cell.textContent || "";

		const computedStyle = window.getComputedStyle(cell);
		const font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;

		return getTextWidth(text, font);
	}

	const handleSort = (key: string) => {
		if (sortKey === key) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortKey(key);
			setSortOrder("asc");
		}
	};

  const sortedData = [...data].sort((a, b) => {
    const valueA = a[sortKey].toString().toLowerCase();
    const valueB = b[sortKey].toString().toLowerCase();
  
    // Verifica se é uma data no formato dd/mm/yyyy
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  
    if (dateRegex.test(valueA) && dateRegex.test(valueB)) {
      // Converte para o formato de data para comparação
      const dateA = new Date(
        parseInt(valueA.slice(6, 10)), // ano
        parseInt(valueA.slice(3, 5)) - 1, // mês
        parseInt(valueA.slice(0, 2)) // dia
      );
  
      const dateB = new Date(
        parseInt(valueB.slice(6, 10)), // ano
        parseInt(valueB.slice(3, 5)) - 1, // mês
        parseInt(valueB.slice(0, 2)) // dia
      );
  
      return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }
  
    // Se não for uma data, verifica se é um número
    const numA = parseFloat(valueA);
    const numB = parseFloat(valueB);
  
    if (!isNaN(numA) && !isNaN(numB)) {
      return sortOrder === "asc" ? numA - numB : numB - numA;
    }
  
    // Comparação padrão para strings
    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });  

	return (
		<table ref={tableRef}>
			<thead>
				<tr>
					{columns.map((column, index) =>
						showColumns[index] ? (
							<th key={column.key} onClick={() => handleSort(column.key)}>
								{column.label}{" "}
								{sortKey === column.key
									? sortOrder === "asc"
										? "↑"
										: "↓"
									: ""}
							</th>
						) : null
					)}
					<th className="action-olunm"></th>
				</tr>
			</thead>
			<tbody>
				{sortedData.map((item) => (
					<tr key={item.id as number}>
						{columns.map((column, index) =>
							showColumns[index] ? (
								<td key={column.key}>{item[column.key]}</td>
							) : null
						)}
						<td className="action-colunm">
							<button
								onClick={() => handleEdit(item.id)}
								className="material-symbols-outlined pointer edit-button"
								title="Cadastrar usuário"
							>
								{"edit"}
							</button>
							<button
								onClick={() => handleDelete(item.id)}
								className="material-symbols-outlined pointer delete-button"
								title="Cadastrar usuário"
							>
								{"delete"}
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

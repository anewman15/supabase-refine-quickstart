import { useList } from "@refinedev/core";

export function CountriesList() {
    const { data}  = useList({
        resource: "countries",
    });

    return (
			<>
				<h2 style={{
							fontFamily: "Arial",
							padding: "16px",
							margin: "16px",
							color: "crimson",
						}}
				>Countries List</h2>
				<ol>
					{
						data?.data.map((country: any) => (
						<li
							style={{
								fontFamily: "Arial",
								padding: "0 16px",
								margin: "0 16px",
								color: "limeGreen",
							}}
						key={country.name}>{country.name}</li>
						))
					}
				</ol>
			</>
    );
};

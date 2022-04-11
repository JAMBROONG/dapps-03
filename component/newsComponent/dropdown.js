import React, { useEffect, useState } from 'react'

export default function Dropdown(props) {
	const value = props.value

	return (
		<section className="cmc-px mb-5">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-8">
						<h2 className="cmc-h2">{value ? value.name : 'All'} Headlines</h2>
					</div>
					<div className="col-md-4">
						<div className={value ? 'cmc-dropdown-wrapper' : null}>
							<div className={value ? "dropdown cmc-dropdown" : "dropdown cmc-dropdown2"}>
								{props.children}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
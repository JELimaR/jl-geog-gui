import { NextPage } from "next";
import Layout from "../components/layout";


interface IMapaProps {
	
}
const Test = (props: IMapaProps) => {

	

	return (
		<div>
			<Layout name="test">
			<h1>Mapa</h1>
			</Layout>
		</div>
	)

}

export const getServerSideProps = () => {
	return {
		props: {
		}
	}
}

export default Test;
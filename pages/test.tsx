import { NextPage } from "next";
import { useState } from "react";
import Layout from "../components/layout";
import SVGComponent, { Viewbox } from "../components/SVGComponent";
import { useForm } from "../hooks/useForm";



interface IMapaProps {

}
const Test = (props: IMapaProps) => {

  const viewBox = new Viewbox(-180, -90, 180, 90);
  const {formData, onChange} = useForm<{tipo: string}>({tipo: 'heightLand'})

  const [href, setTipo] = useState<string>(`/img/Mones10/12100heightLand.jpeg`);

  const handleClick = (e: any) => {
    e.preventDefault();
    setTipo(`/img/Mones10/12100${formData.tipo}.jpeg`);
    console.log(href)
  }

  return (
    <Layout name="test">
      <h1>Mapa</h1>
      <div className='row'>
        <div className="col-10 text-align-center">
          <SVGComponent
            viewbox={viewBox}
            size={{ height: 100, width: 200 }}
            hrefImage={href}
            handleClickFunc={(p: SVGPoint) => {
              console.log(p)
            }}
          >
          </SVGComponent>
        </div>
        <div className="col-2">
        <form>
        <div>
          <label htmlFor="tipo">Azgr Folder Selection:</label>
          <select id="tipo" name="tipo" onChange={(e: any) => onChange(e.target.value, 'tipo')} value={formData.tipo}>
            {
              ['heightLand', 'lifeZones'].map((fol: string, i: number) => <option key={i} value={fol}>{fol}</option>)
            }
          </select>
        </div>
        <div>
          <button onClick={handleClick}>Create</button>
        </div>
      </form>
        </div>

      </div>
      <div className='row text-align-center'>
        <div>
          <button className='btn btn-outline-success btn-sm m-2'>render</button>
          <button className='btn btn-outline-success btn-sm m-2'>render</button>
        </div>

      </div>
    </Layout>
  )

}

export const getServerSideProps = () => {
  return {
    props: {
    }
  }
}

export default Test;
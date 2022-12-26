import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import { getPokeMoveApi } from "../Helpers/getPokemonApi";
import { clippingParents } from "@popperjs/core";

/* Componente que almacena los botones con los movimientos del pokemon aliado, 
este proporciona el className para diseñar los componentes mencionados anteriormente.
Tambien tiene un arreglo que guarda los parametros de los movimientos de forma global.  */

const arrMoves = [];

const ButtonSpace = ({ pokemon, processHealt, handleClickLog, conVida }) => {
  const [move, setMove] = useState({});

  const getMove = async (moveName) => {
    const dataAlly = await getPokeMoveApi(moveName);
    //console.log(dataAlly);
    updateValue(dataAlly);
  };

  const updateValue = (newValue) => {
    arrMoves.push(newValue);
    setMove(newValue);
    //console.log(arrMoves);
    return arrMoves;
  };


  useEffect(() => {
    pokemon.map(({ moves }) => {
      for (let i = 0; i < 4; i++) {
        getMove(moves[i]);
      }
    });
  }, [pokemon]);

  if (arrMoves.length === 4) {
    return (
      <div className="botones">
        {pokemon.map(({name}) => (
          <div key={0}>
            <div key={1}>
              <Tooltip
                disableFocusListener
                title={arrMoves[0].description}
                placement="top"
              >
                <button
                  key={2}
                  type="button"
                  className="m-2 boton"
                  disabled={conVida ? false : true}
                  onClick={() => {
                    if (conVida){
                      processHealt();
                      handleClickLog(name, arrMoves[0].nameEsp);
                    }else{
                      console.log("Desactivated");
                    }
                    
                  }}
                >
                  {arrMoves[0].nameEsp}
                </button>
              </Tooltip>
              <Tooltip
                disableFocusListener
                title={arrMoves[1].description}
                placement="top"
              >
                <button
                  key={2}
                  type="button"
                  className="m-2 boton"
                  disabled={conVida ? false : true}
                  onClick={() => {
                    processHealt();
                    handleClickLog(name,arrMoves[1].nameEsp);
                  }}
                >
                  {arrMoves[1].nameEsp}
                </button>
              </Tooltip>
              <Tooltip
                disableFocusListener
                title={arrMoves[2].description}
                placement="left"
              >
                <button
                  key={2}
                  type="button"
                  className="m-2 boton"
                  disabled={conVida ? false : true}
                  onClick={() => {
                    processHealt();
                    handleClickLog(name,arrMoves[2].nameEsp);
                  }}
                >
                  {arrMoves[2].nameEsp}
                </button>
              </Tooltip>
              <Tooltip
                disableFocusListener
                title={arrMoves[3].description}
                placement="right"
              >
                <button
                  key={2}
                  type="button"
                  disabled={conVida ? false : true}
                  className="m-2 boton"
                  onClick={() => {
                    processHealt();
                    handleClickLog(name,arrMoves[3].nameEsp);
                  }}
                >
                  {arrMoves[3].nameEsp}
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default ButtonSpace;

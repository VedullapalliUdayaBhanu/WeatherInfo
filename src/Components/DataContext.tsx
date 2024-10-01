import { createContext , useState, ReactNode} from "react";


type infoType = {
  id:number
    city : string,
    condition : string,
    degrees : string
  }
  
  type infoTypesArray = infoType[]
  
  type newDataType = infoType;

  type DataContextType = {
    info: infoType[];
    setInfo: React.Dispatch<React.SetStateAction<infoType[]>>;
    newData: infoType;
    setNewData: React.Dispatch<React.SetStateAction<infoType>>;
  };

  type DataProviderProps = {
    children: ReactNode;
  };

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({children}: DataProviderProps) => {
    const [info, setInfo] = useState<infoTypesArray>([{
      id:1,
        city:"Newyork",
        condition : "Sunny",
        degrees : "63"
      }])
    
      const [newData, setNewData] = useState<newDataType>({
        id:0,
        city:"",
        condition : "",
        degrees : ""
      })

      return (
        <DataContext.Provider value={{ info, setInfo, newData, setNewData}}>
            {children}
        </DataContext.Provider>
    );
};

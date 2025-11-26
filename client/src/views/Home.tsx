import { Navbar } from "../components/Navbar";
import { Convoy } from "../utils/types";
import { useGetConvoyProps, useGetConvoys } from "../api/hooks";
import { ConvoyDescription } from "../components/ConvoyDescription";
import { useSelectedConvoy } from "../context/SelectedConvoy";
import convoyBrief from "../json/convoyBrief.json";
import { useSearch } from "../hooks/useSearch";
import { SearchBar } from "../components/SearchBar";
import { useRef } from "react";

export const Home = () => {
  const convoysProps = useGetConvoyProps();
  const { convoys, setConvoys } = useGetConvoys();
  const {
    filteredArray: filteredConvoys,
    search,
    onSearch,
  } = useSearch(convoys);

  const { selectedConvoyId, selectConvoyCallback, resetSelectedConvoyId } =
    useSelectedConvoy();

  const selectedConvoy: Convoy | undefined = convoys.find(
    (convoy: Convoy) => convoy.id === selectedConvoyId
  );

  const inputRef = useRef<HTMLInputElement>(null);
  
  const focusInput = () => {
      inputRef.current?.focus();
  };

  return (
    <>
      <section className="search-input w-50 m-auto">
        <SearchBar
          ref={inputRef}
          searchAction={onSearch}
          searchResult={search}
          placeHolder={"סנן שדות"}
        />
      </section>

      <section className="container mt-5">
        <ConvoyTable
          convoys={filteredConvoys}
          convoyBrief={convoyBrief}
          selectConvoyCallback={selectConvoyCallback}
        />
      </section>

      {selectedConvoy && (
        <div className="w-75 m-auto">
          <ConvoyDescription
            convoyProps={convoysProps}
            selectedConvoy={selectedConvoy}
            onClose={() => {
              resetSelectedConvoyId();
              focusInput();
            }}
            setConvoys={setConvoys}
          />
        </div>
      )}
    </>
  );
};

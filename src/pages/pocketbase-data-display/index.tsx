import React, { useEffect, useState } from "react";
import PocketBase from "pocketbase";

export const PocketBaseDataDisplay: React.FC = () => {
  const [collectionRecords, setCollectionRecords] = useState<Record[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = import.meta.env.VITE_ROGER_POCKETBASE_URL;
        let email = import.meta.env.VITE_POCKETBASE_ADMIN_ETHAN_EMAIL;
        let password = import.meta.env.VITE_POCKETBASE_ADMIN_ETHAN_PASSWORD;

        const pb = new PocketBase(url);
        await pb.admins.authWithPassword(email, password);

        const collections = await pb.collections.getFullList({
          sort: "-created",
        });

        const collectionsNameAndID = collections.map((item) => ({
          name: item.name,
          id: item.id,
        }));

        let allRecords: { [key: string]: Record[] } = {};

        for (const collection of collectionsNameAndID) {
          const collectionRecords = await pb
            .collection(collection.id)
            .getFullList();
          // Only add to the collection allRecords if it's not empty
          if (collectionRecords.length > 0) {
            allRecords[collection.name] = collectionRecords;
          }
        }
        setCollectionRecords(allRecords);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {Object.entries(collectionRecords).map(([key, values]) => (
        <div key={key}>
          <h2>{key}</h2>
          {values.length > 0 ? (
            <table>
              <thead>
                <tr>
                  {Object.keys(values[0]).map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {values.map((value, index) => (
                  <tr key={index}>
                    {Object.values(value).map((cell, i) => (
                      <td key={i}>{cell.toString()}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No records found</p>
          )}
        </div>
      ))}
    </div>
  );
};

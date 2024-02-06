import React, { useEffect, useState } from "react";
import PocketBase from 'pocketbase';

interface Record {
    first_name: string;
    last_name: string;
    favorite_number: number;
}

export const PocketBaseDataDisplay: React.FC = () => {
    const pb = new PocketBase('http://127.0.0.1:8090');
    const [records, setRecords] = useState<Record[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await pb.admins.authWithPassword('element55star@gmail.com', '@Reactelement5*');

            // Read a collection
            const collection = await pb.collections.getOne('test');
            console.log(collection);
            const fetchedRecords = await pb.collection('test').getFullList({
                sort: '-created',
            });
            console.log(fetchedRecords);
            setRecords(fetchedRecords);
        };

        fetchData();
    }, []);

    return (
        <>
            {records.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Favorite Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => (
                            <tr key={index}>
                                <td>{record.first_name}</td>
                                <td>{record.last_name}</td>
                                <td>{record.favorite_number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No records found.</p>
            )}
        </>
    );
};

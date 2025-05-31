'use client'

import { createEquipment, deleteEquipment, getEquipments, updateEquipment } from '@/lib/actions/equipmentActions';
import { useState } from 'react';

export default function TestPage() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [operation, setOperation] = useState('');

    const dummyCreateData = {
        name: "Microscop Test Y",
        inventoryNumber: "INV999",
        availabilityStatus: "AVAILABLE",
        laboratoryId: 1,
        accessRequirements: "Badge999",
        photo: null,
        acquisitionDate: new Date().toISOString(),
        usage: "Research purposes",
        material: "Metal and glass",
        description: "Test microscop creat prin API"
    };

    const dummyUpdateData = {
        name: "Microscop X - Updated",
        laboratoryId: 1,
        availabilityStatus: "AVAILABLE",
        inventoryNumber: "INV999",
    };

    const handleGetEquipments = async () => {
        setLoading(true);
        setOperation('GET All');
        try {
            const response = await getEquipments();
            setResult(response);
        } catch (error) {
            setResult({
                success: false,
                status: 500,
                payload: error.message || 'An error occurred'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreateEquipment = async () => {
        setLoading(true);
        setOperation('CREATE');
        try {
            const response = await createEquipment(dummyCreateData);
            setResult(response);
        } catch (error) {
            setResult({
                success: false,
                status: 500,
                payload: error.message || 'An error occurred'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateEquipment = async () => {
        setLoading(true);
        setOperation('UPDATE');
        try {
            const response = await updateEquipment(1, dummyUpdateData);
            setResult(response);
        } catch (error) {
            setResult({
                success: false,
                status: 500,
                payload: error.message || 'An error occurred'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEquipment = async () => {
        setLoading(true);
        setOperation('DELETE');
        try {
            const response = await deleteEquipment(1);
            setResult(response);
        } catch (error) {
            setResult({
                success: false,
                status: 500,
                payload: error.message || 'An error occurred'
            });
        } finally {
            setLoading(false);
        }
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        margin: '5px'
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Equipment API Test</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <button 
                    onClick={handleGetEquipments}
                    disabled={loading}
                    style={buttonStyle}
                >
                    {loading && operation === 'GET All' ? 'Loading...' : 'Get All Equipments'}
                </button>

                <button 
                    onClick={handleCreateEquipment}
                    disabled={loading}
                    style={{...buttonStyle, backgroundColor: '#28a745'}}
                >
                    {loading && operation === 'CREATE' ? 'Creating...' : 'Create Equipment'}
                </button>

                <button 
                    onClick={handleUpdateEquipment}
                    disabled={loading}
                    style={{...buttonStyle, backgroundColor: '#ffc107', color: '#212529'}}
                >
                    {loading && operation === 'UPDATE' ? 'Updating...' : 'Update Equipment (ID: 1)'}
                </button>

                <button 
                    onClick={handleDeleteEquipment}
                    disabled={loading}
                    style={{...buttonStyle, backgroundColor: '#dc3545'}}
                >
                    {loading && operation === 'DELETE' ? 'Deleting...' : 'Delete Equipment (ID: 1)'}
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Dummy Data Preview:</h3>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <h4>Create Data:</h4>
                        <pre style={{
                            backgroundColor: '#f0f8ff',
                            border: '1px solid #cce7ff',
                            borderRadius: '4px',
                            padding: '10px',
                            fontSize: '12px',
                            maxHeight: '200px',
                            overflow: 'auto'
                        }}>
                            {JSON.stringify(dummyCreateData, null, 2)}
                        </pre>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4>Update Data (for ID: 1):</h4>
                        <pre style={{
                            backgroundColor: '#fff8e1',
                            border: '1px solid #ffecb3',
                            borderRadius: '4px',
                            padding: '10px',
                            fontSize: '12px',
                            maxHeight: '200px',
                            overflow: 'auto'
                        }}>
                            {JSON.stringify(dummyUpdateData, null, 2)}
                        </pre>
                    </div>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <h4>Delete Operation:</h4>
                    <p style={{ 
                        backgroundColor: '#ffe6e6', 
                        border: '1px solid #ffcccc', 
                        borderRadius: '4px', 
                        padding: '10px',
                        margin: 0
                    }}>
                        Will delete equipment with ID: 1
                    </p>
                </div>
            </div>

            {result && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Response from {operation} operation:</h2>
                    <div style={{
                        padding: '10px',
                        backgroundColor: result.success ? '#d4edda' : '#f8d7da',
                        border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
                        borderRadius: '4px',
                        marginBottom: '10px'
                    }}>
                        <strong>Status:</strong> {result.success ? 'Success' : 'Error'} ({result.status})
                    </div>
                    
                    <pre style={{
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #e9ecef',
                        borderRadius: '4px',
                        padding: '15px',
                        overflow: 'auto',
                        maxHeight: '400px',
                        fontSize: '14px',
                        lineHeight: '1.4'
                    }}>
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
} 
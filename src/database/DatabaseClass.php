<?php declare( strict_types = 1 );

namespace App;

use PDO;
use Exception;

class Database
{
    private $connection = null;

    public function __construct($dsn, $username, $password, $options)
    {
        try{	
            $this->connection = new PDO($dsn, $username, $password, $options);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            
        } catch(Exception $e){
            throw new Exception($e->getMessage());   
        }	
    }

    /**
     * Get all instances
     */
    public function fetchAll(String $statement = "" , Array $parameters = [])
    {
        try{	
            $sth = $this->executeStatement( $statement , $parameters );
            return $sth->fetchAll();
        } catch(Exception $e){
            throw new Exception($e->getMessage());   
        }	
    }

    /**
     * Insert into table
     */
    public function insert(String $statement = "" , Array $parameters = [])
    {
        try{		
            $this->executeStatement( $statement , $parameters );     
        }catch(Exception $e){
            throw new Exception($e->getMessage());   
        }	
    }

    /**
     * Prepare and execute sql statement
     */
    private function executeStatement(String $statement = "" , Array $parameters = [])
    {
        try{
            $stmt = $this->connection->prepare($statement);

            foreach($parameters as $key => $value) {
                $stmt->bindParam($key, $value);
            }

            $stmt->execute($parameters);
            return $stmt;
            
        }catch(Exception $e){
            throw new Exception($e->getMessage());   
        }	
    }
}
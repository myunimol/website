<?php

namespace Fleet;

class Config {

	public static function getInstance() {
		if(Config::$INSTANCE == null)
			Config::$INSTANCE = new Config();
		return Config::$INSTANCE->getConfig();
	}

	private function __construct() {
		$this->parser = new \IniParser('app.ini');
		$this->config = $this->parser->parse();
	}

	private function getConfig() {
		$env = getenv("env");
		if(!isset($this->config[$env]))
			return $this->config['development'];
		return $this->config[$env];
	}

	private static $INSTANCE;
	private $config;
	private $parser;
}
